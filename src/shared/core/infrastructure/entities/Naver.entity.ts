import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { NAVER } from "~/src/shared/core/constants/table.constant";

import { CoreEntity } from "~/src/shared/core/infrastructure/entities/Core.entity";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";

@Entity({
  name: "naver",
  comment: "Naver 정보 테이블",
})
export class NaverEntity extends CoreEntity {
  @Column({
    name: NAVER.COLUMN.UNIQUE_ID,
    comment: "고유 아이디",
  })
  uniqueID: string;

  @Column({
    name: NAVER.COLUMN.USER_ID,
  })
  userID: number;

  @OneToOne(() => UsersEntity)
  @JoinColumn({ name: "user_id" })
  user: UsersEntity;
}
