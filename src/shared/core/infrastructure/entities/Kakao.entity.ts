import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { CoreEntity } from "~/src/shared/core/infrastructure/entities/Core.entity";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";

@Entity({
  name: "kakao",
  comment: "Kakao 정보 테이블",
})
export class KakaoEntity extends CoreEntity {
  @Column({
    name: "unique_id",
    comment: "고유 아이디",
  })
  uniqueId: string;

  @RelationId((kakao: KakaoEntity) => kakao.user)
  @Column({
    name: "user_id",
  })
  userId: number;

  @OneToOne(() => UsersEntity)
  @JoinColumn({ name: "user_id" })
  user: UsersEntity;
}
