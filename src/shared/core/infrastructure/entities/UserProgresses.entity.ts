import { Column, Entity, ManyToOne } from "typeorm";
import { CoreEntity } from "~/src/shared/core/infrastructure/entities/Core.entity";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";
import { ProgressStatus } from "~/src/shared/enums/ProgressStatus.enum";
import { ProgressType } from "~/src/shared/enums/ProgressType.enum";

@Entity({ name: "user_progresses" })
export class UserProgressesEntity extends CoreEntity {
  @Column({
    type: "enum",
    name: "progress_type",
    enum: ProgressType,
    comment: "진행 상태 유형",
  })
  progressType: ProgressType;

  @Column({
    type: "enum",
    name: "status",
    enum: ProgressStatus,
    default: ProgressStatus.NOT_STARTED,
    comment: "진행 상태",
  })
  status: ProgressStatus;

  @Column({
    type: "timestamp",
    name: "last_updated",
    comment: "마지막 업데이트 시간",
  })
  lastUpdated: string;

  @ManyToOne(() => UsersEntity, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: UsersEntity;
}
