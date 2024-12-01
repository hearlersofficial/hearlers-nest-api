import { create } from "@bufbuild/protobuf";
import { HttpStatus } from "@nestjs/common";
import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";
import { RefreshTokensVO } from "~/src/aggregates/authUsers/domain/RefreshTokens.vo";
import {
  AuthChannel,
  AuthUser,
  AuthUserSchema,
  OAuthChannelInfo,
  OAuthChannelInfoSchema,
  RefreshToken,
  RefreshTokenSchema,
} from "~/src/gen/v1/model/auth_user_pb";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { TimestampUtils } from "~/src/shared/utils/Date.utils";

export class SchemaAuthUsersMapper {
  static toAuthUserProto(authUser: AuthUsers): AuthUser {
    if (!authUser) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, "failed to map authUser to proto");
    }
    return create(AuthUserSchema, {
      id: authUser.id.getNumber(),
      userId: authUser.userId,
      authChannel: authUser.authChannel,
      oauthChannelInfo: this.toOAuthChannelInfoProto(authUser),
      lastLoginAt: TimestampUtils.dayjsToTimestamp(authUser.lastLoginAt),
      refreshTokens: this.toRefreshTokenProtos(authUser.refreshTokens),
      createdAt: TimestampUtils.dayjsToTimestamp(authUser.createdAt),
      updatedAt: TimestampUtils.dayjsToTimestamp(authUser.updatedAt),
      deletedAt: authUser.deletedAt ? TimestampUtils.dayjsToTimestamp(authUser.deletedAt) : null,
    });
  }

  static toOAuthChannelInfoProto(authUser: AuthUsers): OAuthChannelInfo {
    if (!authUser) {
      throw new HttpStatusBasedRpcException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "failed to map oauthChannelInfo to proto",
      );
    }
    switch (authUser.authChannel) {
      case AuthChannel.KAKAO:
        return create(OAuthChannelInfoSchema, {
          id: authUser.kakao.id.getNumber(),
          authChannel: authUser.authChannel,
          uniqueId: authUser.kakao.uniqueId,
          createdAt: TimestampUtils.dayjsToTimestamp(authUser.kakao.createdAt),
          updatedAt: TimestampUtils.dayjsToTimestamp(authUser.kakao.updatedAt),
          deletedAt: authUser.kakao.deletedAt ? TimestampUtils.dayjsToTimestamp(authUser.kakao.deletedAt) : null,
        });
      default:
        return null;
    }
  }
  static toRefreshTokenProto(refreshToken: RefreshTokensVO): RefreshToken {
    if (!refreshToken) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, "failed to map refreshToken to proto");
    }
    return create(RefreshTokenSchema, {
      token: refreshToken.token,
      expiresAt: TimestampUtils.dayjsToTimestamp(refreshToken.expiresAt),
      createdAt: TimestampUtils.dayjsToTimestamp(refreshToken.createdAt),
      updatedAt: TimestampUtils.dayjsToTimestamp(refreshToken.updatedAt),
    });
  }

  static toRefreshTokenProtos(refreshTokens: RefreshTokensVO[]): RefreshToken[] {
    if (!refreshTokens) return [];
    return refreshTokens.map(this.toRefreshTokenProto);
  }
}
