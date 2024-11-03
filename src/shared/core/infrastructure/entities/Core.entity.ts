import { BaseEntity, Column, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { COMMON_COLUMN } from "~/src/shared/core/constants/entities.constants";

export class CoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: COMMON_COLUMN.COLUMN.CREATED_AT,
    type: "timestamp",
    comment: "생성일시 (한국시간)",
  })
  createdAt: string;

  @Column({
    name: COMMON_COLUMN.COLUMN.UPDATED_AT,
    type: "timestamp",
    comment: "마지막 수정일시 (한국시간)",
  })
  updatedAt: string;

  // NOTE: .softDelete 호출하지 않고 직접 값 넣어주기(날짜 형식 일관성)
  @DeleteDateColumn({
    name: COMMON_COLUMN.COLUMN.DELETED_AT,
    type: "timestamp",
    nullable: true,
    comment: "삭제일시 (한국시간)",
  })
  deletedAt?: string | null;
}
