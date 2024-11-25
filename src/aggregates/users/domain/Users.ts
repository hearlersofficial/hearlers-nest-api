import { AggregateRoot } from "~/src/shared/core/domain/AggregateRoot";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { Result } from "~/src/shared/core/domain/Result";
import { Dayjs } from "dayjs";
import { getNowDayjs, TimestampUtils } from "~/src/shared/utils/Date.utils";
import { AuthChannel, Gender, Mbti, ProgressType } from "~/src/gen/v1/model/user_pb";
import { UserProfiles } from "~/src/aggregates/users/domain/UserProfiles";
import { UserProgresses } from "~/src/aggregates/users/domain/UserProgresses";
import { UserPrompts } from "~/src/aggregates/users/domain/UserPrompts";
import { Kakao } from "~/src/aggregates/users/domain/Kakao";
import { create } from "@bufbuild/protobuf";
import { UserUpdatedPayloadSchema } from "~/src/gen/v1/message/user_pb";
import { UserUpdatedEvent } from "~/src/aggregates/users/domain/events/UserUpdatedEvents";

interface UsersNewProps {
  nickname: string;
  authChannel: AuthChannel;
}

export interface UsersProps extends UsersNewProps {
  userProfile: UserProfiles;
  userProgresses: UserProgresses[];
  userPrompts: UserPrompts[];
  // 카카오 계정, 평시에는 join X
  kakao?: Kakao;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  deletedAt: Dayjs | null;
}

export class Users extends AggregateRoot<UsersProps> {
  private constructor(props: UsersProps, id: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: UsersProps, id: UniqueEntityId): Result<Users> {
    const users = new Users(props, id);
    const validateResult = users.validateDomain();
    if (validateResult.isFailure) {
      return Result.fail<Users>(validateResult.error);
    }
    return Result.ok<Users>(users);
  }

  public static createNew(newProps: UsersNewProps): Result<Users> {
    const now = getNowDayjs();
    const newId = new UniqueEntityId();
    return this.create(
      {
        ...newProps,
        // 계정 생성 시 프로필 기본값
        userProfile: UserProfiles.createNew({
          userId: newId,
          profileImage: "",
          phoneNumber: "",
          gender: Gender.NONE,
          mbti: Mbti.NONE,
          birthday: getNowDayjs(),
          introduction: "",
        }).value,
        userProgresses: [],
        userPrompts: [],
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      },
      newId,
    );
  }

  validateDomain(): Result<void> {
    // nickname 검증
    if (!this.props.nickname) {
      return Result.fail<void>("[Users] 닉네임은 필수입니다");
    }
    if (this.props.nickname.length < 2 || this.props.nickname.length > 20) {
      return Result.fail<void>("[Users] 닉네임은 2-20자 사이여야 합니다");
    }

    // authChannel 검증
    if (!Object.values(AuthChannel).includes(this.props.authChannel)) {
      return Result.fail<void>("[Users] 유효하지 않은 인증 채널입니다");
    }

    // userProfile 검증 (있는 경우)
    if (this.props.userProfile) {
      if (!this.props.userProfile.userId.equals(this.id)) {
        return Result.fail<void>("[Users] 프로필의 사용자 ID가 일치하지 않습니다");
      }
    }

    // userProgresses 검증
    for (const progress of this.props.userProgresses) {
      if (!progress.userId.equals(this.id)) {
        return Result.fail<void>("[Users] 진행 상태의 사용자 ID가 일치하지 않습니다");
      }
    }

    // userPrompts 검증
    for (const prompt of this.props.userPrompts) {
      if (!prompt.userId.equals(this.id)) {
        return Result.fail<void>("[Users] 프롬프트의 사용자 ID가 일치하지 않습니다");
      }
    }

    return Result.ok<void>();
  }

  // Getters
  get nickname(): string {
    return this.props.nickname;
  }

  get authChannel(): AuthChannel {
    return this.props.authChannel;
  }

  get userProfile(): UserProfiles | undefined {
    return this.props.userProfile;
  }

  get userProgresses(): UserProgresses[] {
    return [...this.props.userProgresses];
  }

  get userPrompts(): UserPrompts[] {
    return [...this.props.userPrompts];
  }

  get kakao(): Kakao | undefined {
    return this.props.kakao;
  }

  get createdAt(): Dayjs {
    return this.props.createdAt;
  }

  get updatedAt(): Dayjs {
    return this.props.updatedAt;
  }

  get deletedAt(): Dayjs | null {
    return this.props.deletedAt;
  }

  // Methods
  public setProfile(profile: UserProfiles): Result<void> {
    if (!profile.userId.equals(this.id)) {
      return Result.fail<void>("[Users] 프로필의 사용자 ID가 일치하지 않습니다");
    }
    this.props.userProfile = profile;
    this.props.updatedAt = getNowDayjs();
    const userUpdated = create(UserUpdatedPayloadSchema, {
      userId: this.id.getNumber(),
      authChannel: this.props.authChannel,
      occurredAt: TimestampUtils.now(),
    });

    this.addDomainEvent(new UserUpdatedEvent(userUpdated));
    return Result.ok<void>();
  }

  public addProgress(progress: UserProgresses): Result<void> {
    if (!progress.userId.equals(this.id)) {
      return Result.fail<void>("[Users] 진행 상태의 사용자 ID가 일치하지 않습니다");
    }
    this.props.userProgresses.push(progress);
    this.props.updatedAt = getNowDayjs();
    return Result.ok<void>();
  }

  public addPrompt(prompt: UserPrompts): Result<void> {
    if (!prompt.userId.equals(this.id)) {
      return Result.fail<void>("[Users] 프롬프트의 사용자 ID가 일치하지 않습니다");
    }
    this.props.userPrompts.push(prompt);
    this.props.updatedAt = getNowDayjs();
    return Result.ok<void>();
  }

  public findProgress(type: ProgressType): UserProgresses | undefined {
    return this.props.userProgresses.find((progress) => progress.progressType === type);
  }

  public delete(): void {
    this.props.deletedAt = getNowDayjs();
  }

  public restore(): void {
    this.props.deletedAt = null;
  }

  public setKakao(kakao: Kakao): Result<void> {
    if (!kakao.userId.equals(this.id)) {
      return Result.fail<void>("[Users] Kakao 계정의 사용자 ID가 일치하지 않습니다");
    }
    if (this.props.authChannel !== AuthChannel.KAKAO) {
      return Result.fail<void>("[Users] 인증 채널이 Kakao가 아닙니다");
    }
    this.props.kakao = kakao;
    this.props.updatedAt = getNowDayjs();
    return Result.ok<void>();
  }
}
