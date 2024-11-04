import { DomainEntity, DomainEntityNewProps } from "~/src/shared/core/domain/DomainEntity";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { ProgressStatus } from "~/src/shared/enums/ProgressStatus.enum";
import { ProgressType } from "~/src/shared/enums/ProgressType.enum";
import { Dayjs } from "dayjs";
import { getNowDayjs } from "~/src/shared/utils/Date.utils";
import { Result } from "~/src/shared/core/domain/Result";

interface UserProgressesNewProps extends DomainEntityNewProps {
  userId: UniqueEntityId;
  progressType: ProgressType;
}

interface UserProgressesProps {
  userId: UniqueEntityId;
  progressType: ProgressType;
  status: ProgressStatus;
  lastUpdated: Dayjs;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  deletedAt: Dayjs | null;
}

export class UserProgresses extends DomainEntity<UserProgressesProps, UserProgressesNewProps> {
  private constructor(props: UserProgressesProps, id: UniqueEntityId) {
    super(props, id);
  }

  private static factory(props: UserProgressesProps, id: UniqueEntityId): UserProgresses {
    return new UserProgresses(props, id);
  }
  public static create(props: UserProgressesProps, id: UniqueEntityId): Result<UserProgresses> {
    return DomainEntity.createChild(props, id, UserProgresses.factory);
  }

  public static createNew(newProps: UserProgressesNewProps): Result<UserProgresses> {
    return DomainEntity.createNewChild(newProps, UserProgresses.factory);
  }
  validateDomain(): Result<void> {
    // userId 검증
    if (!this.props.userId) {
      return Result.fail<void>("[UserProgresses] 사용자 ID는 필수입니다");
    }

    // progressType 검증
    if (!this.props.progressType) {
      return Result.fail<void>("[UserProgresses] 진행 유형은 필수입니다");
    }
    if (!Object.values(ProgressType).includes(this.props.progressType)) {
      return Result.fail<void>("[UserProgresses] 유효하지 않은 진행 유형입니다");
    }

    // status 검증
    if (!this.props.status) {
      return Result.fail<void>("[UserProgresses] 상태는 필수입니다");
    }
    if (!Object.values(ProgressStatus).includes(this.props.status)) {
      return Result.fail<void>("[UserProgresses] 유효하지 않은 상태입니다");
    }

    // 날짜 검증
    if (!this.props.lastUpdated) {
      return Result.fail<void>("[UserProgresses] 마지막 업데이트 시간은 필수입니다");
    }
    if (!this.props.createdAt) {
      return Result.fail<void>("[UserProgresses] 생성 시간은 필수입니다");
    }
    if (!this.props.updatedAt) {
      return Result.fail<void>("[UserProgresses] 수정 시간은 필수입니다");
    }

    return Result.ok<void>();
  }

  protected convertToEntityProps(newProps: UserProgressesNewProps): UserProgressesProps {
    return {
      userId: newProps.userId,
      progressType: newProps.progressType,
      status: ProgressStatus.NOT_STARTED,
      lastUpdated: getNowDayjs(),
      createdAt: getNowDayjs(),
      updatedAt: getNowDayjs(),
      deletedAt: null,
    };
  }

  // Getters
  get userId(): UniqueEntityId {
    return this.props.userId;
  }

  get progressType(): ProgressType {
    return this.props.progressType;
  }

  get status(): ProgressStatus {
    return this.props.status;
  }

  get lastUpdated(): Dayjs {
    return this.props.lastUpdated;
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
  public updateStatus(status: ProgressStatus): void {
    this.props.status = status;
    this.props.lastUpdated = getNowDayjs();
    this.props.updatedAt = getNowDayjs();
  }

  public delete(): void {
    this.props.deletedAt = getNowDayjs();
  }

  public restore(): void {
    this.props.deletedAt = null;
  }
}
