// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file v1/model/auth_user.proto (package com.hearlers.v1.model, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file v1/model/auth_user.proto.
 */
export const file_v1_model_auth_user: GenFile = /*@__PURE__*/
  fileDesc("Chh2MS9tb2RlbC9hdXRoX3VzZXIucHJvdG8SFWNvbS5oZWFybGVycy52MS5tb2RlbCKmAwoIQXV0aFVzZXISCgoCaWQYASABKAUSDwoHdXNlcl9pZBgCIAEoBRI4CgxhdXRoX2NoYW5uZWwYAyABKA4yIi5jb20uaGVhcmxlcnMudjEubW9kZWwuQXV0aENoYW5uZWwSQwoSb2F1dGhfY2hhbm5lbF9pbmZvGAQgASgLMicuY29tLmhlYXJsZXJzLnYxLm1vZGVsLk9BdXRoQ2hhbm5lbEluZm8SOwoOcmVmcmVzaF90b2tlbnMYBSADKAsyIy5jb20uaGVhcmxlcnMudjEubW9kZWwuUmVmcmVzaFRva2VuEjEKDWxhc3RfbG9naW5fYXQYBiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCmNyZWF0ZWRfYXQYByABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCnVwZGF0ZWRfYXQYCCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCmRlbGV0ZWRfYXQYCSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wIvsBChBPQXV0aENoYW5uZWxJbmZvEgoKAmlkGAEgASgFEjgKDGF1dGhfY2hhbm5lbBgCIAEoDjIiLmNvbS5oZWFybGVycy52MS5tb2RlbC5BdXRoQ2hhbm5lbBIRCgl1bmlxdWVfaWQYAyABKAkSLgoKY3JlYXRlZF9hdBgEIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKZGVsZXRlZF9hdBgGIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAirQEKDFJlZnJlc2hUb2tlbhINCgV0b2tlbhgBIAEoCRIuCgpleHBpcmVzX2F0GAIgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIuCgpjcmVhdGVkX2F0GAMgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIuCgp1cGRhdGVkX2F0GAQgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcCp2CgtBdXRoQ2hhbm5lbBIcChhBVVRIX0NIQU5ORUxfVU5TUEVDSUZJRUQQABIZChVBVVRIX0NIQU5ORUxfVU5MSU5LRUQQARIWChJBVVRIX0NIQU5ORUxfS0FLQU8QAhIWChJBVVRIX0NIQU5ORUxfTkFWRVIQA0KiAQoZY29tLmNvbS5oZWFybGVycy52MS5tb2RlbEINQXV0aFVzZXJQcm90b1ABogIEQ0hWTaoCFUNvbS5IZWFybGVycy5WMS5Nb2RlbMoCFUNvbVxIZWFybGVyc1xWMVxNb2RlbOICIUNvbVxIZWFybGVyc1xWMVxNb2RlbFxHUEJNZXRhZGF0YeoCGENvbTo6SGVhcmxlcnM6OlYxOjpNb2RlbGIGcHJvdG8z", [file_google_protobuf_timestamp]);

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
  messageDesc(file_v1_model_auth_user, 0);

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
  messageDesc(file_v1_model_auth_user, 1);

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
  messageDesc(file_v1_model_auth_user, 2);

/**
 * @generated from enum com.hearlers.v1.model.AuthChannel
 */
export enum AuthChannel {
  /**
   * @generated from enum value: AUTH_CHANNEL_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: AUTH_CHANNEL_UNLINKED = 1;
   */
  UNLINKED = 1,

  /**
   * @generated from enum value: AUTH_CHANNEL_KAKAO = 2;
   */
  KAKAO = 2,

  /**
   * @generated from enum value: AUTH_CHANNEL_NAVER = 3;
   */
  NAVER = 3,
}

/**
 * Describes the enum com.hearlers.v1.model.AuthChannel.
 */
export const AuthChannelSchema: GenEnum<AuthChannel> = /*@__PURE__*/
  enumDesc(file_v1_model_auth_user, 0);

