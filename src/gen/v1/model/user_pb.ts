// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file v1/model/user.proto (package com.hearlers.v1.model, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_struct, file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";

/**
 * Describes the file v1/model/user.proto.
 */
export const file_v1_model_user: GenFile = /*@__PURE__*/
  fileDesc("ChN2MS9tb2RlbC91c2VyLnByb3RvEhVjb20uaGVhcmxlcnMudjEubW9kZWwi5gIKBFVzZXISCgoCaWQYASABKAUSEAoIbmlja25hbWUYAiABKAkSOAoMYXV0aF9jaGFubmVsGAMgASgOMiIuY29tLmhlYXJsZXJzLnYxLm1vZGVsLkF1dGhDaGFubmVsEjgKDHVzZXJfcHJvZmlsZRgEIAEoCzIiLmNvbS5oZWFybGVycy52MS5tb2RlbC5Vc2VyUHJvZmlsZRI8Cg91c2VyX3Byb2dyZXNzZXMYBSADKAsyIy5jb20uaGVhcmxlcnMudjEubW9kZWwuVXNlclByb2dyZXNzEi4KCmNyZWF0ZWRfYXQYBiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCnVwZGF0ZWRfYXQYByABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCmRlbGV0ZWRfYXQYCCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wIugCCgtVc2VyUHJvZmlsZRIVCg1wcm9maWxlX2ltYWdlGAEgASgJEhQKDHBob25lX251bWJlchgCIAEoCRItCgZnZW5kZXIYAyABKA4yHS5jb20uaGVhcmxlcnMudjEubW9kZWwuR2VuZGVyEiwKCGJpcnRoZGF5GAQgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIUCgxpbnRyb2R1Y3Rpb24YBSABKAkSKQoEbWJ0aRgGIAEoDjIbLmNvbS5oZWFybGVycy52MS5tb2RlbC5NYnRpEi4KCmNyZWF0ZWRfYXQYByABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCnVwZGF0ZWRfYXQYCCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCmRlbGV0ZWRfYXQYCSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wIsMCCgxVc2VyUHJvZ3Jlc3MSOgoNcHJvZ3Jlc3NfdHlwZRgBIAEoDjIjLmNvbS5oZWFybGVycy52MS5tb2RlbC5Qcm9ncmVzc1R5cGUSNQoGc3RhdHVzGAIgASgOMiUuY29tLmhlYXJsZXJzLnYxLm1vZGVsLlByb2dyZXNzU3RhdHVzEjAKDGxhc3RfdXBkYXRlZBgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKY3JlYXRlZF9hdBgEIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKZGVsZXRlZF9hdBgGIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAihQMKDFVzZXJBY3Rpdml0eRI6Cg1hY3Rpdml0eV90eXBlGAEgASgOMiMuY29tLmhlYXJsZXJzLnYxLm1vZGVsLkFjdGl2aXR5VHlwZRIuCg1hY3Rpdml0eV9kYXRhGAIgASgLMhcuZ29vZ2xlLnByb3RvYnVmLlN0cnVjdBI3CghwbGF0Zm9ybRgDIAEoDjIlLmNvbS5oZWFybGVycy52MS5tb2RlbC5EZXZpY2VQbGF0Zm9ybRISCgppcF9hZGRyZXNzGAQgASgJEhIKCnVzZXJfYWdlbnQYBSABKAkSGAoQZHVyYXRpb25fc2Vjb25kcxgGIAEoBRIuCgpjcmVhdGVkX2F0GAcgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIuCgp1cGRhdGVkX2F0GAggASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIuCgpkZWxldGVkX2F0GAkgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcCpUCgtBdXRoQ2hhbm5lbBIVChFBVVRIX0NIQU5ORUxfTk9ORRAAEhYKEkFVVEhfQ0hBTk5FTF9LQUtBTxABEhYKEkFVVEhfQ0hBTk5FTF9OQVZFUhACKj0KBkdlbmRlchIPCgtHRU5ERVJfTk9ORRAAEg8KC0dFTkRFUl9NQUxFEAESEQoNR0VOREVSX0ZFTUFMRRACKo4BCg5Qcm9ncmVzc1N0YXR1cxIfChtQUk9HUkVTU19TVEFUVVNfTk9UX1NUQVJURUQQABIfChtQUk9HUkVTU19TVEFUVVNfSU5fUFJPR1JFU1MQARIdChlQUk9HUkVTU19TVEFUVVNfQ09NUExFVEVEEAISGwoXUFJPR1JFU1NfU1RBVFVTX0JMT0NLRUQQAypMCgxQcm9ncmVzc1R5cGUSHAoYUFJPR1JFU1NfVFlQRV9PTkJPQVJESU5HEAASHgoaUFJPR1JFU1NfVFlQRV9WRVJJRklDQVRJT04QASqFAgoETWJ0aRINCglNQlRJX05PTkUQABINCglNQlRJX0VOVFAQARINCglNQlRJX0VORlAQAhINCglNQlRJX0VOVEoQAxINCglNQlRJX0VORkoQBBINCglNQlRJX0VTVFAQBRINCglNQlRJX0VTVEoQBhINCglNQlRJX0VTRlAQBxINCglNQlRJX0VTRkoQCBINCglNQlRJX0lOVEoQCRINCglNQlRJX0lORkoQChINCglNQlRJX0lOVFAQCxINCglNQlRJX0lORlAQDBINCglNQlRJX0lTVFAQDRINCglNQlRJX0lTVEoQDhINCglNQlRJX0lTRlAQDxINCglNQlRJX0lTRkoQECqWAQoORGV2aWNlUGxhdGZvcm0SGAoUREVWSUNFX1BMQVRGT1JNX05PTkUQABIXChNERVZJQ0VfUExBVEZPUk1fV0VCEAESFwoTREVWSUNFX1BMQVRGT1JNX0lPUxACEhsKF0RFVklDRV9QTEFURk9STV9BTkRST0lEEAMSGwoXREVWSUNFX1BMQVRGT1JNX0RFU0tUT1AQBCriBAoMQWN0aXZpdHlUeXBlEhYKEkFDVElWSVRZX1RZUEVfTk9ORRAAEhcKE0FDVElWSVRZX1RZUEVfTE9HSU4QARIYChRBQ1RJVklUWV9UWVBFX0xPR09VVBACEikKJUFDVElWSVRZX1RZUEVfVU5MT0dJTk5FRF9VU0VSX0NPTUVfSU4QAxI0CjBBQ1RJVklUWV9UWVBFX1VOTE9HSU5ORURfVVNFUl9TVEFSVEVEX0NPVU5TRUxJTkcQBBI1CjFBQ1RJVklUWV9UWVBFX1VOTE9HSU5ORURfVVNFUl9GSU5JU0hFRF9DT1VOU0VMSU5HEAUSIgoeQUNUSVZJVFlfVFlQRV9PTkJPQVJESU5HX1NUQVJUEAYSIAocQUNUSVZJVFlfVFlQRV9PTkJPQVJESU5HX0VORBAHEi0KKUFDVElWSVRZX1RZUEVfU0VUX0NPTlZFUlNBVElPTl9QUkVGRVJFTkNFEAgSIgoeQUNUSVZJVFlfVFlQRV9DT1VOU0VMSU5HX1NUQVJUEAkSIAocQUNUSVZJVFlfVFlQRV9DT1VOU0VMSU5HX0VORBAKEiAKHEFDVElWSVRZX1RZUEVfUFJPRklMRV9VUERBVEUQCxIhCh1BQ1RJVklUWV9UWVBFX0ZFRURCQUNLX1NVQk1JVBAMEiQKIEFDVElWSVRZX1RZUEVfU1VCU0NSSVBUSU9OX1NUQVJUEA0SJQohQUNUSVZJVFlfVFlQRV9TVUJTQ1JJUFRJT05fQ0FOQ0VMEA4SIgoeQUNUSVZJVFlfVFlQRV9QQVlNRU5UX0NPTVBMRVRFEA9CngEKGWNvbS5jb20uaGVhcmxlcnMudjEubW9kZWxCCVVzZXJQcm90b1ABogIEQ0hWTaoCFUNvbS5IZWFybGVycy5WMS5Nb2RlbMoCFUNvbVxIZWFybGVyc1xWMVxNb2RlbOICIUNvbVxIZWFybGVyc1xWMVxNb2RlbFxHUEJNZXRhZGF0YeoCGENvbTo6SGVhcmxlcnM6OlYxOjpNb2RlbGIGcHJvdG8z", [file_google_protobuf_timestamp, file_google_protobuf_struct]);

/**
 * @generated from message com.hearlers.v1.model.User
 */
export type User = Message<"com.hearlers.v1.model.User"> & {
  /**
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * @generated from field: string nickname = 2;
   */
  nickname: string;

  /**
   * @generated from field: com.hearlers.v1.model.AuthChannel auth_channel = 3;
   */
  authChannel: AuthChannel;

  /**
   * @generated from field: com.hearlers.v1.model.UserProfile user_profile = 4;
   */
  userProfile?: UserProfile;

  /**
   * @generated from field: repeated com.hearlers.v1.model.UserProgress user_progresses = 5;
   */
  userProgresses: UserProgress[];

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 6;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp updated_at = 7;
   */
  updatedAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp deleted_at = 8;
   */
  deletedAt?: Timestamp;
};

/**
 * Describes the message com.hearlers.v1.model.User.
 * Use `create(UserSchema)` to create a new message.
 */
export const UserSchema: GenMessage<User> = /*@__PURE__*/
  messageDesc(file_v1_model_user, 0);

/**
 * @generated from message com.hearlers.v1.model.UserProfile
 */
export type UserProfile = Message<"com.hearlers.v1.model.UserProfile"> & {
  /**
   * @generated from field: string profile_image = 1;
   */
  profileImage: string;

  /**
   * @generated from field: string phone_number = 2;
   */
  phoneNumber: string;

  /**
   * @generated from field: com.hearlers.v1.model.Gender gender = 3;
   */
  gender: Gender;

  /**
   * @generated from field: google.protobuf.Timestamp birthday = 4;
   */
  birthday?: Timestamp;

  /**
   * @generated from field: string introduction = 5;
   */
  introduction: string;

  /**
   * @generated from field: com.hearlers.v1.model.Mbti mbti = 6;
   */
  mbti: Mbti;

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
 * Describes the message com.hearlers.v1.model.UserProfile.
 * Use `create(UserProfileSchema)` to create a new message.
 */
export const UserProfileSchema: GenMessage<UserProfile> = /*@__PURE__*/
  messageDesc(file_v1_model_user, 1);

/**
 * @generated from message com.hearlers.v1.model.UserProgress
 */
export type UserProgress = Message<"com.hearlers.v1.model.UserProgress"> & {
  /**
   * @generated from field: com.hearlers.v1.model.ProgressType progress_type = 1;
   */
  progressType: ProgressType;

  /**
   * @generated from field: com.hearlers.v1.model.ProgressStatus status = 2;
   */
  status: ProgressStatus;

  /**
   * @generated from field: google.protobuf.Timestamp last_updated = 3;
   */
  lastUpdated?: Timestamp;

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
 * Describes the message com.hearlers.v1.model.UserProgress.
 * Use `create(UserProgressSchema)` to create a new message.
 */
export const UserProgressSchema: GenMessage<UserProgress> = /*@__PURE__*/
  messageDesc(file_v1_model_user, 2);

/**
 * @generated from message com.hearlers.v1.model.UserActivity
 */
export type UserActivity = Message<"com.hearlers.v1.model.UserActivity"> & {
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
 * Describes the message com.hearlers.v1.model.UserActivity.
 * Use `create(UserActivitySchema)` to create a new message.
 */
export const UserActivitySchema: GenMessage<UserActivity> = /*@__PURE__*/
  messageDesc(file_v1_model_user, 3);

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
  enumDesc(file_v1_model_user, 0);

/**
 * @generated from enum com.hearlers.v1.model.Gender
 */
export enum Gender {
  /**
   * @generated from enum value: GENDER_NONE = 0;
   */
  NONE = 0,

  /**
   * @generated from enum value: GENDER_MALE = 1;
   */
  MALE = 1,

  /**
   * @generated from enum value: GENDER_FEMALE = 2;
   */
  FEMALE = 2,
}

/**
 * Describes the enum com.hearlers.v1.model.Gender.
 */
export const GenderSchema: GenEnum<Gender> = /*@__PURE__*/
  enumDesc(file_v1_model_user, 1);

/**
 * @generated from enum com.hearlers.v1.model.ProgressStatus
 */
export enum ProgressStatus {
  /**
   * @generated from enum value: PROGRESS_STATUS_NOT_STARTED = 0;
   */
  NOT_STARTED = 0,

  /**
   * @generated from enum value: PROGRESS_STATUS_IN_PROGRESS = 1;
   */
  IN_PROGRESS = 1,

  /**
   * @generated from enum value: PROGRESS_STATUS_COMPLETED = 2;
   */
  COMPLETED = 2,

  /**
   * @generated from enum value: PROGRESS_STATUS_BLOCKED = 3;
   */
  BLOCKED = 3,
}

/**
 * Describes the enum com.hearlers.v1.model.ProgressStatus.
 */
export const ProgressStatusSchema: GenEnum<ProgressStatus> = /*@__PURE__*/
  enumDesc(file_v1_model_user, 2);

/**
 * @generated from enum com.hearlers.v1.model.ProgressType
 */
export enum ProgressType {
  /**
   * @generated from enum value: PROGRESS_TYPE_ONBOARDING = 0;
   */
  ONBOARDING = 0,

  /**
   * @generated from enum value: PROGRESS_TYPE_VERIFICATION = 1;
   */
  VERIFICATION = 1,
}

/**
 * Describes the enum com.hearlers.v1.model.ProgressType.
 */
export const ProgressTypeSchema: GenEnum<ProgressType> = /*@__PURE__*/
  enumDesc(file_v1_model_user, 3);

/**
 * @generated from enum com.hearlers.v1.model.Mbti
 */
export enum Mbti {
  /**
   * @generated from enum value: MBTI_NONE = 0;
   */
  NONE = 0,

  /**
   * @generated from enum value: MBTI_ENTP = 1;
   */
  ENTP = 1,

  /**
   * @generated from enum value: MBTI_ENFP = 2;
   */
  ENFP = 2,

  /**
   * @generated from enum value: MBTI_ENTJ = 3;
   */
  ENTJ = 3,

  /**
   * @generated from enum value: MBTI_ENFJ = 4;
   */
  ENFJ = 4,

  /**
   * @generated from enum value: MBTI_ESTP = 5;
   */
  ESTP = 5,

  /**
   * @generated from enum value: MBTI_ESTJ = 6;
   */
  ESTJ = 6,

  /**
   * @generated from enum value: MBTI_ESFP = 7;
   */
  ESFP = 7,

  /**
   * @generated from enum value: MBTI_ESFJ = 8;
   */
  ESFJ = 8,

  /**
   * @generated from enum value: MBTI_INTJ = 9;
   */
  INTJ = 9,

  /**
   * @generated from enum value: MBTI_INFJ = 10;
   */
  INFJ = 10,

  /**
   * @generated from enum value: MBTI_INTP = 11;
   */
  INTP = 11,

  /**
   * @generated from enum value: MBTI_INFP = 12;
   */
  INFP = 12,

  /**
   * @generated from enum value: MBTI_ISTP = 13;
   */
  ISTP = 13,

  /**
   * @generated from enum value: MBTI_ISTJ = 14;
   */
  ISTJ = 14,

  /**
   * @generated from enum value: MBTI_ISFP = 15;
   */
  ISFP = 15,

  /**
   * @generated from enum value: MBTI_ISFJ = 16;
   */
  ISFJ = 16,
}

/**
 * Describes the enum com.hearlers.v1.model.Mbti.
 */
export const MbtiSchema: GenEnum<Mbti> = /*@__PURE__*/
  enumDesc(file_v1_model_user, 4);

/**
 * @generated from enum com.hearlers.v1.model.DevicePlatform
 */
export enum DevicePlatform {
  /**
   * @generated from enum value: DEVICE_PLATFORM_NONE = 0;
   */
  NONE = 0,

  /**
   * @generated from enum value: DEVICE_PLATFORM_WEB = 1;
   */
  WEB = 1,

  /**
   * @generated from enum value: DEVICE_PLATFORM_IOS = 2;
   */
  IOS = 2,

  /**
   * @generated from enum value: DEVICE_PLATFORM_ANDROID = 3;
   */
  ANDROID = 3,

  /**
   * @generated from enum value: DEVICE_PLATFORM_DESKTOP = 4;
   */
  DESKTOP = 4,
}

/**
 * Describes the enum com.hearlers.v1.model.DevicePlatform.
 */
export const DevicePlatformSchema: GenEnum<DevicePlatform> = /*@__PURE__*/
  enumDesc(file_v1_model_user, 5);

/**
 * @generated from enum com.hearlers.v1.model.ActivityType
 */
export enum ActivityType {
  /**
   * @generated from enum value: ACTIVITY_TYPE_NONE = 0;
   */
  NONE = 0,

  /**
   * @generated from enum value: ACTIVITY_TYPE_LOGIN = 1;
   */
  LOGIN = 1,

  /**
   * @generated from enum value: ACTIVITY_TYPE_LOGOUT = 2;
   */
  LOGOUT = 2,

  /**
   * @generated from enum value: ACTIVITY_TYPE_UNLOGINNED_USER_COME_IN = 3;
   */
  UNLOGINNED_USER_COME_IN = 3,

  /**
   * @generated from enum value: ACTIVITY_TYPE_UNLOGINNED_USER_STARTED_COUNSELING = 4;
   */
  UNLOGINNED_USER_STARTED_COUNSELING = 4,

  /**
   * @generated from enum value: ACTIVITY_TYPE_UNLOGINNED_USER_FINISHED_COUNSELING = 5;
   */
  UNLOGINNED_USER_FINISHED_COUNSELING = 5,

  /**
   * @generated from enum value: ACTIVITY_TYPE_ONBOARDING_START = 6;
   */
  ONBOARDING_START = 6,

  /**
   * @generated from enum value: ACTIVITY_TYPE_ONBOARDING_END = 7;
   */
  ONBOARDING_END = 7,

  /**
   * @generated from enum value: ACTIVITY_TYPE_SET_CONVERSATION_PREFERENCE = 8;
   */
  SET_CONVERSATION_PREFERENCE = 8,

  /**
   * @generated from enum value: ACTIVITY_TYPE_COUNSELING_START = 9;
   */
  COUNSELING_START = 9,

  /**
   * @generated from enum value: ACTIVITY_TYPE_COUNSELING_END = 10;
   */
  COUNSELING_END = 10,

  /**
   * @generated from enum value: ACTIVITY_TYPE_PROFILE_UPDATE = 11;
   */
  PROFILE_UPDATE = 11,

  /**
   * @generated from enum value: ACTIVITY_TYPE_FEEDBACK_SUBMIT = 12;
   */
  FEEDBACK_SUBMIT = 12,

  /**
   * @generated from enum value: ACTIVITY_TYPE_SUBSCRIPTION_START = 13;
   */
  SUBSCRIPTION_START = 13,

  /**
   * @generated from enum value: ACTIVITY_TYPE_SUBSCRIPTION_CANCEL = 14;
   */
  SUBSCRIPTION_CANCEL = 14,

  /**
   * @generated from enum value: ACTIVITY_TYPE_PAYMENT_COMPLETE = 15;
   */
  PAYMENT_COMPLETE = 15,
}

/**
 * Describes the enum com.hearlers.v1.model.ActivityType.
 */
export const ActivityTypeSchema: GenEnum<ActivityType> = /*@__PURE__*/
  enumDesc(file_v1_model_user, 6);

