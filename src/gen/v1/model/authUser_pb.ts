// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file v1/model/authUser.proto (package com.hearlers.v1.model, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file v1/model/authUser.proto.
 */
export const file_v1_model_authUser: GenFile = /*@__PURE__*/
  fileDesc("Chd2MS9tb2RlbC9hdXRoVXNlci5wcm90bxIVY29tLmhlYXJsZXJzLnYxLm1vZGVsIqYDCghBdXRoVXNlchIKCgJpZBgBIAEoBRIPCgd1c2VyX2lkGAIgASgFEjgKDGF1dGhfY2hhbm5lbBgDIAEoDjIiLmNvbS5oZWFybGVycy52MS5tb2RlbC5BdXRoQ2hhbm5lbBJDChJvYXV0aF9jaGFubmVsX2luZm8YBCABKAsyJy5jb20uaGVhcmxlcnMudjEubW9kZWwuT0F1dGhDaGFubmVsSW5mbxI7Cg5yZWZyZXNoX3Rva2VucxgFIAMoCzIjLmNvbS5oZWFybGVycy52MS5tb2RlbC5SZWZyZXNoVG9rZW4SMQoNbGFzdF9sb2dpbl9hdBgGIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKY3JlYXRlZF9hdBgHIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgIIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKZGVsZXRlZF9hdBgJIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAi+wEKEE9BdXRoQ2hhbm5lbEluZm8SCgoCaWQYASABKAUSOAoMYXV0aF9jaGFubmVsGAIgASgOMiIuY29tLmhlYXJsZXJzLnYxLm1vZGVsLkF1dGhDaGFubmVsEhEKCXVuaXF1ZV9pZBgDIAEoCRIuCgpjcmVhdGVkX2F0GAQgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIuCgp1cGRhdGVkX2F0GAUgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIuCgpkZWxldGVkX2F0GAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcCKtAQoMUmVmcmVzaFRva2VuEg0KBXRva2VuGAEgASgJEi4KCmV4cGlyZXNfYXQYAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCmNyZWF0ZWRfYXQYAyABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCnVwZGF0ZWRfYXQYBCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wKlQKC0F1dGhDaGFubmVsEhUKEUFVVEhfQ0hBTk5FTF9OT05FEAASFgoSQVVUSF9DSEFOTkVMX0tBS0FPEAESFgoSQVVUSF9DSEFOTkVMX05BVkVSEAJCogEKGWNvbS5jb20uaGVhcmxlcnMudjEubW9kZWxCDUF1dGhVc2VyUHJvdG9QAaICBENIVk2qAhVDb20uSGVhcmxlcnMuVjEuTW9kZWzKAhVDb21cSGVhcmxlcnNcVjFcTW9kZWziAiFDb21cSGVhcmxlcnNcVjFcTW9kZWxcR1BCTWV0YWRhdGHqAhhDb206OkhlYXJsZXJzOjpWMTo6TW9kZWxiBnByb3RvMw", [file_google_protobuf_timestamp]);

/**
 * @generated from message com.hearlers.v1.model.AuthUser
 */
export type AuthUser = Message<"com.hearlers.v1.model.AuthUser"> & {
  /**
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * @generated from field: int32 user_id = 2;
   */
  userId: number;

  /**
   * @generated from field: com.hearlers.v1.model.AuthChannel auth_channel = 3;
   */
  authChannel: AuthChannel;

  /**
   * @generated from field: com.hearlers.v1.model.OAuthChannelInfo oauth_channel_info = 4;
   */
  oauthChannelInfo?: OAuthChannelInfo;

  /**
   * @generated from field: repeated com.hearlers.v1.model.RefreshToken refresh_tokens = 5;
   */
  refreshTokens: RefreshToken[];

  /**
   * @generated from field: google.protobuf.Timestamp last_login_at = 6;
   */
  lastLoginAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 7;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp updated_at = 8;
   */
  updatedAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp deleted_at = 9;
   */
  deletedAt?: Timestamp;
};

/**
 * Describes the message com.hearlers.v1.model.AuthUser.
 * Use `create(AuthUserSchema)` to create a new message.
 */
export const AuthUserSchema: GenMessage<AuthUser> = /*@__PURE__*/
  messageDesc(file_v1_model_authUser, 0);

/**
 * @generated from message com.hearlers.v1.model.OAuthChannelInfo
 */
export type OAuthChannelInfo = Message<"com.hearlers.v1.model.OAuthChannelInfo"> & {
  /**
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * @generated from field: com.hearlers.v1.model.AuthChannel auth_channel = 2;
   */
  authChannel: AuthChannel;

  /**
   * @generated from field: string unique_id = 3;
   */
  uniqueId: string;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 4;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp updated_at = 5;
   */
  updatedAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp deleted_at = 6;
   */
  deletedAt?: Timestamp;
};

/**
 * Describes the message com.hearlers.v1.model.OAuthChannelInfo.
 * Use `create(OAuthChannelInfoSchema)` to create a new message.
 */
export const OAuthChannelInfoSchema: GenMessage<OAuthChannelInfo> = /*@__PURE__*/
  messageDesc(file_v1_model_authUser, 1);

/**
 * @generated from message com.hearlers.v1.model.RefreshToken
 */
export type RefreshToken = Message<"com.hearlers.v1.model.RefreshToken"> & {
  /**
   * @generated from field: string token = 1;
   */
  token: string;

  /**
   * @generated from field: google.protobuf.Timestamp expires_at = 2;
   */
  expiresAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 3;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp updated_at = 4;
   */
  updatedAt?: Timestamp;
};

/**
 * Describes the message com.hearlers.v1.model.RefreshToken.
 * Use `create(RefreshTokenSchema)` to create a new message.
 */
export const RefreshTokenSchema: GenMessage<RefreshToken> = /*@__PURE__*/
  messageDesc(file_v1_model_authUser, 2);

/**
 * @generated from enum com.hearlers.v1.model.AuthChannel
 */
export enum AuthChannel {
  /**
   * @generated from enum value: AUTH_CHANNEL_NONE = 0;
   */
  NONE = 0,

  /**
   * @generated from enum value: AUTH_CHANNEL_KAKAO = 1;
   */
  KAKAO = 1,

  /**
   * @generated from enum value: AUTH_CHANNEL_NAVER = 2;
   */
  NAVER = 2,
}

/**
 * Describes the enum com.hearlers.v1.model.AuthChannel.
 */
export const AuthChannelSchema: GenEnum<AuthChannel> = /*@__PURE__*/
  enumDesc(file_v1_model_authUser, 0);

