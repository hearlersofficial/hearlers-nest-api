import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { AuthUsersEntity } from "~/src/shared/core/infrastructure/entities/AuthUsers.entity";
@Entity({ name: "refresh_tokens", comment: "리프레시 토큰 테이블" })
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", comment: "리프레시 토큰" })
  token: string;

  @Column({ type: "datetime", comment: "토큰 만료 시간" })
  expiresAt: string;

  @JoinColumn({ name: "authUserId" })
  @ManyToOne(() => AuthUsersEntity, (authUser) => authUser.refreshTokens, {
    onDelete: "CASCADE", // 사용자 삭제 시 토큰도 삭제
    onUpdate: "CASCADE",
  })
  authUser: AuthUsersEntity;

  @RelationId((refreshToken: RefreshTokenEntity) => refreshToken.authUser)
  @Column({ name: "auth_user_id", type: "int", comment: "사용자 ID" })
  authUserId: number;

  @Column({
    name: "created_at",
    type: "datetime",
    comment: "생성일시 (한국시간)",
  })
  createdAt: string;

  @Column({
    name: "updated_at",
    type: "datetime",
    comment: "마지막 수정일시 (한국시간)",
  })
  updatedAt: string;
}
