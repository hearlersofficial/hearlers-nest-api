import { AggregateRoot, AggregateRootNewProps } from "~/src/shared/core/domain/AggregateRoot";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { Result } from "~/src/shared/core/domain/Result";
import { Dayjs } from "dayjs";
import { getNowDayjs } from "~/src/shared/utils/Date.utils";
import { AuthChannel } from "~/src/shared/enums/AuthChannel.enum";
import { UserProfiles } from "~/src/aggregates/users/domain/UserProfiles";
import { UserProgresses } from "~/src/aggregates/users/domain/UserProgresses";
import { UserPrompts } from "~/src/aggregates/users/domain/UserPrompts";
import { Gender } from "~/src/shared/enums/Gender.enum";

interface UsersNewProps extends AggregateRootNewProps {
  nickname: string;
  authChannel: AuthChannel;
}

interface UsersProps extends UsersNewProps {
  userProfile: UserProfiles;
  userProgresses: UserProgresses[];
  userPrompts: UserPrompts[];
  createdAt: Dayjs;
  updatedAt: Dayjs;
  deletedAt: Dayjs | null;
}

export class Users extends AggregateRoot<UsersProps, UsersNewProps> {
  private constructor(props: UsersProps, id: UniqueEntityId) {
    super(props, id);
  }

  private static factory(props: UsersProps, id: UniqueEntityId): Users {
    return new Users(props, id);
  }

  public static create(props: UsersProps, id: UniqueEntityId): Result<Users> {
    return AggregateRoot.createChild(props, id, Users.factory);
  }

  public static createNew(newProps: UsersNewProps): Result<Users> {
    return AggregateRoot.createNewChild(newProps, Users.factory);
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

  protected convertToEntityProps(newProps: UsersNewProps): UsersProps {
    return {
      nickname: newProps.nickname,
      authChannel: newProps.authChannel || AuthChannel.NONE,
      // 계정 생성 시 프로필 기본값
      userProfile: UserProfiles.createNew({
        userId: this.id,
        profileImage: "",
        phoneNumber: "",
        gender: Gender.NONE,
        birthday: getNowDayjs(),
        introduction: "",
      }).value,
      userProgresses: [],
      userPrompts: [],
      createdAt: getNowDayjs(),
      updatedAt: getNowDayjs(),
      deletedAt: null,
    };
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

  public updateNickname(nickname: string): Result<void> {
    if (!nickname || nickname.length < 2 || nickname.length > 20) {
      return Result.fail<void>("[Users] 닉네임은 2-20자 사이여야 합니다");
    }
    this.props.nickname = nickname;
    this.props.updatedAt = getNowDayjs();
    return Result.ok<void>();
  }

  public updateAuthChannel(authChannel: AuthChannel): Result<void> {
    if (!Object.values(AuthChannel).includes(authChannel)) {
      return Result.fail<void>("[Users] 유효하지 않은 인증 채널입니다");
    }
    this.props.authChannel = authChannel;
    this.props.updatedAt = getNowDayjs();
    return Result.ok<void>();
  }

  public delete(): void {
    this.props.deletedAt = getNowDayjs();
  }

  public restore(): void {
    this.props.deletedAt = null;
  }
}
