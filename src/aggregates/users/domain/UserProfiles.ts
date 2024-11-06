import { DomainEntity, DomainEntityNewProps } from "~/src/shared/core/domain/DomainEntity";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { Gender } from "~/src/shared/enums/Gender.enum";
import { Result } from "~/src/shared/core/domain/Result";
import { Dayjs } from "dayjs";
import { getNowDayjs } from "~/src/shared/utils/Date.utils";

interface UserProfilesNewProps extends DomainEntityNewProps {
  userId: UniqueEntityId;
  profileImage: string;
  phoneNumber: string;
  gender: Gender;
  birthday: Dayjs;
  introduction: string;
}

interface UserProfilesProps extends UserProfilesNewProps {
  createdAt: Dayjs;
  updatedAt: Dayjs;
  deletedAt: Dayjs | null;
}

export class UserProfiles extends DomainEntity<UserProfilesProps, UserProfilesNewProps> {
  private constructor(props: UserProfilesProps, id: UniqueEntityId) {
    super(props, id);
  }

  private static factory(props: UserProfilesProps, id: UniqueEntityId): UserProfiles {
    return new UserProfiles(props, id);
  }

  public static create(props: UserProfilesProps, id: UniqueEntityId): Result<UserProfiles> {
    return DomainEntity.createChild(props, id, UserProfiles.factory);
  }

  public static createNew(newProps: UserProfilesNewProps): Result<UserProfiles> {
    return DomainEntity.createNewChild(newProps, UserProfiles.factory);
  }

  validateDomain(): Result<void> {
    // userId 검증
    if (!this.props.userId) {
      return Result.fail<void>("[UserProfiles] 사용자 ID는 필수입니다");
    }

    // profileImage 검증
    if (this.props.profileImage === null || this.props.profileImage === undefined) {
      return Result.fail<void>("[UserProfiles] 프로필 이미지는 필수입니다");
    }

    // phoneNumber 검증
    if (this.props.phoneNumber) {
      if (!this.validatePhoneNumber(this.props.phoneNumber)) {
        return Result.fail<void>("[UserProfiles] 유효하지 않은 전화번호 형식입니다");
      }
    }
    // gender 검증
    if (this.props.gender === null || this.props.gender === undefined) {
      return Result.fail<void>("[UserProfiles] 성별은 필수입니다");
    }
    if (!Object.values(Gender).includes(this.props.gender)) {
      return Result.fail<void>("[UserProfiles] 유효하지 않은 성별입니다");
    }

    // introduction 검증
    if (this.props.introduction && this.props.introduction.length > 500) {
      return Result.fail<void>("[UserProfiles] 자기소개는 500자를 초과할 수 없습니다");
    }

    // 날짜 검증
    if (!this.props.createdAt) {
      return Result.fail<void>("[UserProfiles] 생성 시간은 필수입니다");
    }
    if (!this.props.updatedAt) {
      return Result.fail<void>("[UserProfiles] 수정 시간은 필수입니다");
    }

    return Result.ok<void>();
  }

  protected convertToEntityProps(newProps: UserProfilesNewProps): UserProfilesProps {
    return {
      userId: newProps.userId,
      profileImage: newProps.profileImage,
      phoneNumber: newProps.phoneNumber,
      gender: newProps.gender,
      birthday: newProps.birthday,
      introduction: newProps.introduction,
      createdAt: getNowDayjs(),
      updatedAt: getNowDayjs(),
      deletedAt: null,
    };
  }

  private validatePhoneNumber(phoneNumber: string): boolean {
    // 한국 전화번호 형식 검증 (010-1234-5678 또는 01012345678)
    const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    return phoneRegex.test(phoneNumber.replace(/-/g, ""));
  }

  // Getters
  get userId(): UniqueEntityId {
    return this.props.userId;
  }

  get profileImage(): string {
    return this.props.profileImage;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get gender(): Gender {
    return this.props.gender;
  }

  get birthday(): Dayjs {
    return this.props.birthday;
  }

  get introduction(): string {
    return this.props.introduction;
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
  public updateProfile(
    props: Partial<{
      profileImage: string;
      phoneNumber: string;
      introduction: string;
    }>,
  ): Result<void> {
    if (props.profileImage !== undefined) {
      this.props.profileImage = props.profileImage;
    }
    if (props.phoneNumber !== undefined) {
      if (!this.validatePhoneNumber(props.phoneNumber)) {
        return Result.fail<void>("[UserProfiles] 유효하지 않은 전화번호 형식입니다");
      }
      this.props.phoneNumber = props.phoneNumber;
    }
    if (props.introduction !== undefined) {
      if (props.introduction.length > 500) {
        return Result.fail<void>("[UserProfiles] 자기소개는 500자를 초과할 수 없습니다");
      }
      this.props.introduction = props.introduction;
    }

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