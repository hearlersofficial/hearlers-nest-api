// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file v1/service/user.proto (package com.hearlers.v1.service, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { ActivityType, DevicePlatform, User, UserActivity, UserProfile } from "../model/user_pb";
import { file_v1_model_user } from "../model/user_pb";
import type { AuthChannel, AuthUser } from "../model/auth_user_pb";
import { file_v1_model_auth_user } from "../model/auth_user_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_struct, file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Pagination } from "../common/pagination_pb";
import { file_v1_common_pagination } from "../common/pagination_pb";
import type { JsonObject, Message } from "@bufbuild/protobuf";

/**
 * Describes the file v1/service/user.proto.
 */
export const file_v1_service_user: GenFile = /*@__PURE__*/
  fileDesc("ChV2MS9zZXJ2aWNlL3VzZXIucHJvdG8SF2NvbS5oZWFybGVycy52MS5zZXJ2aWNlIhcKFUluaXRpYWxpemVVc2VyUmVxdWVzdCJ3ChZJbml0aWFsaXplVXNlclJlc3BvbnNlEikKBHVzZXIYASABKAsyGy5jb20uaGVhcmxlcnMudjEubW9kZWwuVXNlchIyCglhdXRoX3VzZXIYAiABKAsyHy5jb20uaGVhcmxlcnMudjEubW9kZWwuQXV0aFVzZXIieQoZQ29ubmVjdEF1dGhDaGFubmVsUmVxdWVzdBIPCgd1c2VyX2lkGAEgASgFEjgKDGF1dGhfY2hhbm5lbBgCIAEoDjIiLmNvbS5oZWFybGVycy52MS5tb2RlbC5BdXRoQ2hhbm5lbBIRCgl1bmlxdWVfaWQYAyABKAkiUAoaQ29ubmVjdEF1dGhDaGFubmVsUmVzcG9uc2USMgoJYXV0aF91c2VyGAEgASgLMh8uY29tLmhlYXJsZXJzLnYxLm1vZGVsLkF1dGhVc2VyImkKF1NhdmVSZWZyZXNoVG9rZW5SZXF1ZXN0Eg8KB3VzZXJfaWQYASABKAUSDQoFdG9rZW4YAiABKAkSLgoKZXhwaXJlc19hdBgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAiKwoYU2F2ZVJlZnJlc2hUb2tlblJlc3BvbnNlEg8KB3N1Y2Nlc3MYASABKAgiOwoZVmVyaWZ5UmVmcmVzaFRva2VuUmVxdWVzdBIPCgd1c2VyX2lkGAEgASgFEg0KBXRva2VuGAIgASgJIi0KGlZlcmlmeVJlZnJlc2hUb2tlblJlc3BvbnNlEg8KB3N1Y2Nlc3MYASABKAgiWgoSRmluZE9uZVVzZXJSZXF1ZXN0EhQKB3VzZXJfaWQYASABKAVIAIgBARIVCghuaWNrbmFtZRgCIAEoCUgBiAEBQgoKCF91c2VyX2lkQgsKCV9uaWNrbmFtZSJAChNGaW5kT25lVXNlclJlc3BvbnNlEikKBHVzZXIYASABKAsyGy5jb20uaGVhcmxlcnMudjEubW9kZWwuVXNlciJNChNGaW5kTWFueVVzZXJSZXF1ZXN0EjYKCnBhZ2luYXRpb24YASABKAsyIi5jb20uaGVhcmxlcnMudjEuY29tbW9uLlBhZ2luYXRpb24iQAoSRmluZE1hbnlVc2VyUmVzdWx0EioKBXVzZXJzGAEgAygLMhsuY29tLmhlYXJsZXJzLnYxLm1vZGVsLlVzZXIi3AEKFkZpbmRPbmVBdXRoVXNlclJlcXVlc3QSGQoMYXV0aF91c2VyX2lkGAEgASgFSACIAQESFAoHdXNlcl9pZBgCIAEoBUgBiAEBEj0KDGF1dGhfY2hhbm5lbBgDIAEoDjIiLmNvbS5oZWFybGVycy52MS5tb2RlbC5BdXRoQ2hhbm5lbEgCiAEBEhYKCXVuaXF1ZV9pZBgEIAEoCUgDiAEBQg8KDV9hdXRoX3VzZXJfaWRCCgoIX3VzZXJfaWRCDwoNX2F1dGhfY2hhbm5lbEIMCgpfdW5pcXVlX2lkIk0KF0ZpbmRPbmVBdXRoVXNlclJlc3BvbnNlEjIKCWF1dGhfdXNlchgBIAEoCzIfLmNvbS5oZWFybGVycy52MS5tb2RlbC5BdXRoVXNlciKYAQoRVXBkYXRlVXNlclJlcXVlc3QSDwoHdXNlcl9pZBgBIAEoBRIVCghuaWNrbmFtZRgCIAEoCUgAiAEBEj0KDHVzZXJfcHJvZmlsZRgDIAEoCzIiLmNvbS5oZWFybGVycy52MS5tb2RlbC5Vc2VyUHJvZmlsZUgBiAEBQgsKCV9uaWNrbmFtZUIPCg1fdXNlcl9wcm9maWxlIj8KElVwZGF0ZVVzZXJSZXNwb25zZRIpCgR1c2VyGAEgASgLMhsuY29tLmhlYXJsZXJzLnYxLm1vZGVsLlVzZXIi/gEKFUNyZWF0ZUFjdGl2aXR5UmVxdWVzdBI6Cg1hY3Rpdml0eV90eXBlGAEgASgOMiMuY29tLmhlYXJsZXJzLnYxLm1vZGVsLkFjdGl2aXR5VHlwZRIuCg1hY3Rpdml0eV9kYXRhGAIgASgLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdBI3CghwbGF0Zm9ybRgDIAEoDjIlLmNvbS5oZWFybGVycy52MS5tb2RlbC5EZXZpY2VQbGF0Zm9ybRISCgppcF9hZGRyZXNzGAQgASgJEhIKCnVzZXJfYWdlbnQYBSABKAkSGAoQZHVyYXRpb25fc2Vjb25kcxgGIAEoBSJUChZDcmVhdGVBY3Rpdml0eVJlc3BvbnNlEjoKDXVzZXJfYWN0aXZpdHkYASABKAsyIy5jb20uaGVhcmxlcnMudjEubW9kZWwuVXNlckFjdGl2aXR5MrEHCgtVc2VyU2VydmljZRJxCg5Jbml0aWFsaXplVXNlchIuLmNvbS5oZWFybGVycy52MS5zZXJ2aWNlLkluaXRpYWxpemVVc2VyUmVxdWVzdBovLmNvbS5oZWFybGVycy52MS5zZXJ2aWNlLkluaXRpYWxpemVVc2VyUmVzcG9uc2USfQoSQ29ubmVjdEF1dGhDaGFubmVsEjIuY29tLmhlYXJsZXJzLnYxLnNlcnZpY2UuQ29ubmVjdEF1dGhDaGFubmVsUmVxdWVzdBozLmNvbS5oZWFybGVycy52MS5zZXJ2aWNlLkNvbm5lY3RBdXRoQ2hhbm5lbFJlc3BvbnNlEncKEFNhdmVSZWZyZXNoVG9rZW4SMC5jb20uaGVhcmxlcnMudjEuc2VydmljZS5TYXZlUmVmcmVzaFRva2VuUmVxdWVzdBoxLmNvbS5oZWFybGVycy52MS5zZXJ2aWNlLlNhdmVSZWZyZXNoVG9rZW5SZXNwb25zZRJ9ChJWZXJpZnlSZWZyZXNoVG9rZW4SMi5jb20uaGVhcmxlcnMudjEuc2VydmljZS5WZXJpZnlSZWZyZXNoVG9rZW5SZXF1ZXN0GjMuY29tLmhlYXJsZXJzLnYxLnNlcnZpY2UuVmVyaWZ5UmVmcmVzaFRva2VuUmVzcG9uc2USaAoLRmluZE9uZVVzZXISKy5jb20uaGVhcmxlcnMudjEuc2VydmljZS5GaW5kT25lVXNlclJlcXVlc3QaLC5jb20uaGVhcmxlcnMudjEuc2VydmljZS5GaW5kT25lVXNlclJlc3BvbnNlEnQKD0ZpbmRPbmVBdXRoVXNlchIvLmNvbS5oZWFybGVycy52MS5zZXJ2aWNlLkZpbmRPbmVBdXRoVXNlclJlcXVlc3QaMC5jb20uaGVhcmxlcnMudjEuc2VydmljZS5GaW5kT25lQXV0aFVzZXJSZXNwb25zZRJlCgpVcGRhdGVVc2VyEiouY29tLmhlYXJsZXJzLnYxLnNlcnZpY2UuVXBkYXRlVXNlclJlcXVlc3QaKy5jb20uaGVhcmxlcnMudjEuc2VydmljZS5VcGRhdGVVc2VyUmVzcG9uc2UScQoOQ3JlYXRlQWN0aXZpdHkSLi5jb20uaGVhcmxlcnMudjEuc2VydmljZS5DcmVhdGVBY3Rpdml0eVJlcXVlc3QaLy5jb20uaGVhcmxlcnMudjEuc2VydmljZS5DcmVhdGVBY3Rpdml0eVJlc3BvbnNlQqgBChtjb20uY29tLmhlYXJsZXJzLnYxLnNlcnZpY2VCCVVzZXJQcm90b1ABogIEQ0hWU6oCF0NvbS5IZWFybGVycy5WMS5TZXJ2aWNlygIXQ29tXEhlYXJsZXJzXFYxXFNlcnZpY2XiAiNDb21cSGVhcmxlcnNcVjFcU2VydmljZVxHUEJNZXRhZGF0YeoCGkNvbTo6SGVhcmxlcnM6OlYxOjpTZXJ2aWNlYgZwcm90bzM", [file_v1_model_user, file_v1_model_auth_user, file_google_protobuf_timestamp, file_v1_common_pagination, file_google_protobuf_struct]);

/**
 * initializeUser
 *
 * @generated from message com.hearlers.v1.service.InitializeUserRequest
 */
export type InitializeUserRequest = Message<"com.hearlers.v1.service.InitializeUserRequest"> & {
};

/**
 * Describes the message com.hearlers.v1.service.InitializeUserRequest.
 * Use `create(InitializeUserRequestSchema)` to create a new message.
 */
export const InitializeUserRequestSchema: GenMessage<InitializeUserRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 0);

/**
 * @generated from message com.hearlers.v1.service.InitializeUserResponse
 */
export type InitializeUserResponse = Message<"com.hearlers.v1.service.InitializeUserResponse"> & {
  /**
   * @generated from field: com.hearlers.v1.model.User user = 1;
   */
  user?: User;

  /**
   * @generated from field: com.hearlers.v1.model.AuthUser auth_user = 2;
   */
  authUser?: AuthUser;
};

/**
 * Describes the message com.hearlers.v1.service.InitializeUserResponse.
 * Use `create(InitializeUserResponseSchema)` to create a new message.
 */
export const InitializeUserResponseSchema: GenMessage<InitializeUserResponse> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 1);

/**
 * connectAuthChannel
 *
 * @generated from message com.hearlers.v1.service.ConnectAuthChannelRequest
 */
export type ConnectAuthChannelRequest = Message<"com.hearlers.v1.service.ConnectAuthChannelRequest"> & {
  /**
   * @generated from field: int32 user_id = 1;
   */
  userId: number;

  /**
   * @generated from field: com.hearlers.v1.model.AuthChannel auth_channel = 2;
   */
  authChannel: AuthChannel;

  /**
   * @generated from field: string unique_id = 3;
   */
  uniqueId: string;
};

/**
 * Describes the message com.hearlers.v1.service.ConnectAuthChannelRequest.
 * Use `create(ConnectAuthChannelRequestSchema)` to create a new message.
 */
export const ConnectAuthChannelRequestSchema: GenMessage<ConnectAuthChannelRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 2);

/**
 * @generated from message com.hearlers.v1.service.ConnectAuthChannelResponse
 */
export type ConnectAuthChannelResponse = Message<"com.hearlers.v1.service.ConnectAuthChannelResponse"> & {
  /**
   * @generated from field: com.hearlers.v1.model.AuthUser auth_user = 1;
   */
  authUser?: AuthUser;
};

/**
 * Describes the message com.hearlers.v1.service.ConnectAuthChannelResponse.
 * Use `create(ConnectAuthChannelResponseSchema)` to create a new message.
 */
export const ConnectAuthChannelResponseSchema: GenMessage<ConnectAuthChannelResponse> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 3);

/**
 * saveRefreshToken
 *
 * @generated from message com.hearlers.v1.service.SaveRefreshTokenRequest
 */
export type SaveRefreshTokenRequest = Message<"com.hearlers.v1.service.SaveRefreshTokenRequest"> & {
  /**
   * @generated from field: int32 user_id = 1;
   */
  userId: number;

  /**
   * @generated from field: string token = 2;
   */
  token: string;

  /**
   * @generated from field: google.protobuf.Timestamp expires_at = 3;
   */
  expiresAt?: Timestamp;
};

/**
 * Describes the message com.hearlers.v1.service.SaveRefreshTokenRequest.
 * Use `create(SaveRefreshTokenRequestSchema)` to create a new message.
 */
export const SaveRefreshTokenRequestSchema: GenMessage<SaveRefreshTokenRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 4);

/**
 * @generated from message com.hearlers.v1.service.SaveRefreshTokenResponse
 */
export type SaveRefreshTokenResponse = Message<"com.hearlers.v1.service.SaveRefreshTokenResponse"> & {
  /**
   * @generated from field: bool success = 1;
   */
  success: boolean;
};

/**
 * Describes the message com.hearlers.v1.service.SaveRefreshTokenResponse.
 * Use `create(SaveRefreshTokenResponseSchema)` to create a new message.
 */
export const SaveRefreshTokenResponseSchema: GenMessage<SaveRefreshTokenResponse> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 5);

/**
 * verifyRefreshToken
 *
 * @generated from message com.hearlers.v1.service.VerifyRefreshTokenRequest
 */
export type VerifyRefreshTokenRequest = Message<"com.hearlers.v1.service.VerifyRefreshTokenRequest"> & {
  /**
   * @generated from field: int32 user_id = 1;
   */
  userId: number;

  /**
   * @generated from field: string token = 2;
   */
  token: string;
};

/**
 * Describes the message com.hearlers.v1.service.VerifyRefreshTokenRequest.
 * Use `create(VerifyRefreshTokenRequestSchema)` to create a new message.
 */
export const VerifyRefreshTokenRequestSchema: GenMessage<VerifyRefreshTokenRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 6);

/**
 * @generated from message com.hearlers.v1.service.VerifyRefreshTokenResponse
 */
export type VerifyRefreshTokenResponse = Message<"com.hearlers.v1.service.VerifyRefreshTokenResponse"> & {
  /**
   * @generated from field: bool success = 1;
   */
  success: boolean;
};

/**
 * Describes the message com.hearlers.v1.service.VerifyRefreshTokenResponse.
 * Use `create(VerifyRefreshTokenResponseSchema)` to create a new message.
 */
export const VerifyRefreshTokenResponseSchema: GenMessage<VerifyRefreshTokenResponse> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 7);

/**
 * findOneUser
 *
 * @generated from message com.hearlers.v1.service.FindOneUserRequest
 */
export type FindOneUserRequest = Message<"com.hearlers.v1.service.FindOneUserRequest"> & {
  /**
   * @generated from field: optional int32 user_id = 1;
   */
  userId?: number;

  /**
   * @generated from field: optional string nickname = 2;
   */
  nickname?: string;
};

/**
 * Describes the message com.hearlers.v1.service.FindOneUserRequest.
 * Use `create(FindOneUserRequestSchema)` to create a new message.
 */
export const FindOneUserRequestSchema: GenMessage<FindOneUserRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 8);

/**
 * @generated from message com.hearlers.v1.service.FindOneUserResponse
 */
export type FindOneUserResponse = Message<"com.hearlers.v1.service.FindOneUserResponse"> & {
  /**
   * @generated from field: com.hearlers.v1.model.User user = 1;
   */
  user?: User;
};

/**
 * Describes the message com.hearlers.v1.service.FindOneUserResponse.
 * Use `create(FindOneUserResponseSchema)` to create a new message.
 */
export const FindOneUserResponseSchema: GenMessage<FindOneUserResponse> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 9);

/**
 * findManyUser
 *
 * @generated from message com.hearlers.v1.service.FindManyUserRequest
 */
export type FindManyUserRequest = Message<"com.hearlers.v1.service.FindManyUserRequest"> & {
  /**
   * @generated from field: com.hearlers.v1.common.Pagination pagination = 1;
   */
  pagination?: Pagination;
};

/**
 * Describes the message com.hearlers.v1.service.FindManyUserRequest.
 * Use `create(FindManyUserRequestSchema)` to create a new message.
 */
export const FindManyUserRequestSchema: GenMessage<FindManyUserRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 10);

/**
 * @generated from message com.hearlers.v1.service.FindManyUserResult
 */
export type FindManyUserResult = Message<"com.hearlers.v1.service.FindManyUserResult"> & {
  /**
   * @generated from field: repeated com.hearlers.v1.model.User users = 1;
   */
  users: User[];
};

/**
 * Describes the message com.hearlers.v1.service.FindManyUserResult.
 * Use `create(FindManyUserResultSchema)` to create a new message.
 */
export const FindManyUserResultSchema: GenMessage<FindManyUserResult> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 11);

/**
 * findOneAuthUser
 *
 * @generated from message com.hearlers.v1.service.FindOneAuthUserRequest
 */
export type FindOneAuthUserRequest = Message<"com.hearlers.v1.service.FindOneAuthUserRequest"> & {
  /**
   * @generated from field: optional int32 auth_user_id = 1;
   */
  authUserId?: number;

  /**
   * @generated from field: optional int32 user_id = 2;
   */
  userId?: number;

  /**
   * @generated from field: optional com.hearlers.v1.model.AuthChannel auth_channel = 3;
   */
  authChannel?: AuthChannel;

  /**
   * @generated from field: optional string unique_id = 4;
   */
  uniqueId?: string;
};

/**
 * Describes the message com.hearlers.v1.service.FindOneAuthUserRequest.
 * Use `create(FindOneAuthUserRequestSchema)` to create a new message.
 */
export const FindOneAuthUserRequestSchema: GenMessage<FindOneAuthUserRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 12);

/**
 * @generated from message com.hearlers.v1.service.FindOneAuthUserResponse
 */
export type FindOneAuthUserResponse = Message<"com.hearlers.v1.service.FindOneAuthUserResponse"> & {
  /**
   * @generated from field: com.hearlers.v1.model.AuthUser auth_user = 1;
   */
  authUser?: AuthUser;
};

/**
 * Describes the message com.hearlers.v1.service.FindOneAuthUserResponse.
 * Use `create(FindOneAuthUserResponseSchema)` to create a new message.
 */
export const FindOneAuthUserResponseSchema: GenMessage<FindOneAuthUserResponse> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 13);

/**
 * updateUser
 *
 * @generated from message com.hearlers.v1.service.UpdateUserRequest
 */
export type UpdateUserRequest = Message<"com.hearlers.v1.service.UpdateUserRequest"> & {
  /**
   * @generated from field: int32 user_id = 1;
   */
  userId: number;

  /**
   * @generated from field: optional string nickname = 2;
   */
  nickname?: string;

  /**
   * @generated from field: optional com.hearlers.v1.model.UserProfile user_profile = 3;
   */
  userProfile?: UserProfile;
};

/**
 * Describes the message com.hearlers.v1.service.UpdateUserRequest.
 * Use `create(UpdateUserRequestSchema)` to create a new message.
 */
export const UpdateUserRequestSchema: GenMessage<UpdateUserRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 14);

/**
 * @generated from message com.hearlers.v1.service.UpdateUserResponse
 */
export type UpdateUserResponse = Message<"com.hearlers.v1.service.UpdateUserResponse"> & {
  /**
   * @generated from field: com.hearlers.v1.model.User user = 1;
   */
  user?: User;
};

/**
 * Describes the message com.hearlers.v1.service.UpdateUserResponse.
 * Use `create(UpdateUserResponseSchema)` to create a new message.
 */
export const UpdateUserResponseSchema: GenMessage<UpdateUserResponse> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 15);

/**
 * createActivity
 *
 * @generated from message com.hearlers.v1.service.CreateActivityRequest
 */
export type CreateActivityRequest = Message<"com.hearlers.v1.service.CreateActivityRequest"> & {
  /**
   * @generated from field: com.hearlers.v1.model.ActivityType activity_type = 1;
   */
  activityType: ActivityType;

  /**
   * @generated from field: google.protobuf.Struct activity_data = 2;
   */
  activityData?: JsonObject;

  /**
   * @generated from field: com.hearlers.v1.model.DevicePlatform platform = 3;
   */
  platform: DevicePlatform;

  /**
   * @generated from field: string ip_address = 4;
   */
  ipAddress: string;

  /**
   * @generated from field: string user_agent = 5;
   */
  userAgent: string;

  /**
   * @generated from field: int32 duration_seconds = 6;
   */
  durationSeconds: number;
};

/**
 * Describes the message com.hearlers.v1.service.CreateActivityRequest.
 * Use `create(CreateActivityRequestSchema)` to create a new message.
 */
export const CreateActivityRequestSchema: GenMessage<CreateActivityRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 16);

/**
 * @generated from message com.hearlers.v1.service.CreateActivityResponse
 */
export type CreateActivityResponse = Message<"com.hearlers.v1.service.CreateActivityResponse"> & {
  /**
   * @generated from field: com.hearlers.v1.model.UserActivity user_activity = 1;
   */
  userActivity?: UserActivity;
};

/**
 * Describes the message com.hearlers.v1.service.CreateActivityResponse.
 * Use `create(CreateActivityResponseSchema)` to create a new message.
 */
export const CreateActivityResponseSchema: GenMessage<CreateActivityResponse> = /*@__PURE__*/
  messageDesc(file_v1_service_user, 17);

/**
 * @generated from service com.hearlers.v1.service.UserService
 */
export const UserService: GenService<{
  /**
   * 최초 접속 시 user & authUser 생성
   *
   * @generated from rpc com.hearlers.v1.service.UserService.InitializeUser
   */
  initializeUser: {
    methodKind: "unary";
    input: typeof InitializeUserRequestSchema;
    output: typeof InitializeUserResponseSchema;
  },
  /**
   * 인증 채널 연결
   *
   * @generated from rpc com.hearlers.v1.service.UserService.ConnectAuthChannel
   */
  connectAuthChannel: {
    methodKind: "unary";
    input: typeof ConnectAuthChannelRequestSchema;
    output: typeof ConnectAuthChannelResponseSchema;
  },
  /**
   * 리프레시 토큰 저장
   *
   * @generated from rpc com.hearlers.v1.service.UserService.SaveRefreshToken
   */
  saveRefreshToken: {
    methodKind: "unary";
    input: typeof SaveRefreshTokenRequestSchema;
    output: typeof SaveRefreshTokenResponseSchema;
  },
  /**
   * 리프레시 토큰 인증
   *
   * @generated from rpc com.hearlers.v1.service.UserService.VerifyRefreshToken
   */
  verifyRefreshToken: {
    methodKind: "unary";
    input: typeof VerifyRefreshTokenRequestSchema;
    output: typeof VerifyRefreshTokenResponseSchema;
  },
  /**
   * 유저 조회
   *
   * @generated from rpc com.hearlers.v1.service.UserService.FindOneUser
   */
  findOneUser: {
    methodKind: "unary";
    input: typeof FindOneUserRequestSchema;
    output: typeof FindOneUserResponseSchema;
  },
  /**
   * 유저 목록 조회
   * rpc FindManyUser (FindManyUserRequest) returns (FindManyUserResult);
   * 인증 유저 조회
   *
   * @generated from rpc com.hearlers.v1.service.UserService.FindOneAuthUser
   */
  findOneAuthUser: {
    methodKind: "unary";
    input: typeof FindOneAuthUserRequestSchema;
    output: typeof FindOneAuthUserResponseSchema;
  },
  /**
   * 유저 업데이트
   *
   * @generated from rpc com.hearlers.v1.service.UserService.UpdateUser
   */
  updateUser: {
    methodKind: "unary";
    input: typeof UpdateUserRequestSchema;
    output: typeof UpdateUserResponseSchema;
  },
  /**
   * 활동 생성
   *
   * @generated from rpc com.hearlers.v1.service.UserService.CreateActivity
   */
  createActivity: {
    methodKind: "unary";
    input: typeof CreateActivityRequestSchema;
    output: typeof CreateActivityResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_v1_service_user, 0);

