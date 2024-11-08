// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file v1/model/user.proto (package com.hearlers.v1.model, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file v1/model/user.proto.
 */
export const file_v1_model_user: GenFile = /*@__PURE__*/
  fileDesc("ChN2MS9tb2RlbC91c2VyLnByb3RvEhVjb20uaGVhcmxlcnMudjEubW9kZWwikgIKBFVzZXISCgoCaWQYASABKAUSEAoIbmlja25hbWUYAiABKAkSOAoMYXV0aF9jaGFubmVsGAMgASgOMiIuY29tLmhlYXJsZXJzLnYxLm1vZGVsLkF1dGhDaGFubmVsEjgKDHVzZXJfcHJvZmlsZRgEIAEoCzIiLmNvbS5oZWFybGVycy52MS5tb2RlbC5Vc2VyUHJvZmlsZRI8Cg91c2VyX3Byb2dyZXNzZXMYBSADKAsyIy5jb20uaGVhcmxlcnMudjEubW9kZWwuVXNlclByb2dyZXNzEhIKCmNyZWF0ZWRfYXQYBiABKAkSEgoKdXBkYXRlZF9hdBgHIAEoCRISCgpkZWxldGVkX2F0GAggASgJIs0BCgtVc2VyUHJvZmlsZRIVCg1wcm9maWxlX2ltYWdlGAEgASgJEhQKDHBob25lX251bWJlchgCIAEoCRItCgZnZW5kZXIYAyABKA4yHS5jb20uaGVhcmxlcnMudjEubW9kZWwuR2VuZGVyEhAKCGJpcnRoZGF5GAQgASgJEhQKDGludHJvZHVjdGlvbhgFIAEoCRISCgpjcmVhdGVkX2F0GAYgASgJEhIKCnVwZGF0ZWRfYXQYByABKAkSEgoKZGVsZXRlZF9hdBgIIAEoCSLwAQoMVXNlclByb2dyZXNzEgoKAmlkGAEgASgDEg8KB3VzZXJfaWQYAiABKAMSOgoNcHJvZ3Jlc3NfdHlwZRgDIAEoDjIjLmNvbS5oZWFybGVycy52MS5tb2RlbC5Qcm9ncmVzc1R5cGUSNQoGc3RhdHVzGAQgASgOMiUuY29tLmhlYXJsZXJzLnYxLm1vZGVsLlByb2dyZXNzU3RhdHVzEhQKDGxhc3RfdXBkYXRlZBgFIAEoCRISCgpjcmVhdGVkX2F0GAYgASgJEhIKCnVwZGF0ZWRfYXQYByABKAkSEgoKZGVsZXRlZF9hdBgIIAEoCSpUCgtBdXRoQ2hhbm5lbBIVChFBVVRIX0NIQU5ORUxfTk9ORRAAEhYKEkFVVEhfQ0hBTk5FTF9LQUtBTxABEhYKEkFVVEhfQ0hBTk5FTF9OQVZFUhACKj0KBkdlbmRlchIPCgtHRU5ERVJfTk9ORRAAEg8KC0dFTkRFUl9NQUxFEAESEQoNR0VOREVSX0ZFTUFMRRACKo4BCg5Qcm9ncmVzc1N0YXR1cxIfChtQUk9HUkVTU19TVEFUVVNfTk9UX1NUQVJURUQQABIfChtQUk9HUkVTU19TVEFUVVNfSU5fUFJPR1JFU1MQARIdChlQUk9HUkVTU19TVEFUVVNfQ09NUExFVEVEEAISGwoXUFJPR1JFU1NfU1RBVFVTX0JMT0NLRUQQAyrNAQoMUHJvZ3Jlc3NUeXBlEhwKGFBST0dSRVNTX1RZUEVfT05CT0FSRElORxAAEiQKIFBST0dSRVNTX1RZUEVfUFJPRklMRV9DT01QTEVUSU9OEAESHgoaUFJPR1JFU1NfVFlQRV9WRVJJRklDQVRJT04QAhIeChpQUk9HUkVTU19UWVBFX1NVQlNDUklQVElPThADEh8KG1BST0dSRVNTX1RZUEVfRklSU1RfU0VTU0lPThAEEhgKFFBST0dSRVNTX1RZUEVfUkVWSUVXEAVCngEKGWNvbS5jb20uaGVhcmxlcnMudjEubW9kZWxCCVVzZXJQcm90b1ABogIEQ0hWTaoCFUNvbS5IZWFybGVycy5WMS5Nb2RlbMoCFUNvbVxIZWFybGVyc1xWMVxNb2RlbOICIUNvbVxIZWFybGVyc1xWMVxNb2RlbFxHUEJNZXRhZGF0YeoCGENvbTo6SGVhcmxlcnM6OlYxOjpNb2RlbGIGcHJvdG8z");

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
   * @generated from field: string created_at = 6;
   */
  createdAt: string;

  /**
   * @generated from field: string updated_at = 7;
   */
  updatedAt: string;

  /**
   * @generated from field: string deleted_at = 8;
   */
  deletedAt: string;
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
   * @generated from field: string birthday = 4;
   */
  birthday: string;

  /**
   * @generated from field: string introduction = 5;
   */
  introduction: string;

  /**
   * @generated from field: string created_at = 6;
   */
  createdAt: string;

  /**
   * @generated from field: string updated_at = 7;
   */
  updatedAt: string;

  /**
   * @generated from field: string deleted_at = 8;
   */
  deletedAt: string;
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
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: int64 user_id = 2;
   */
  userId: bigint;

  /**
   * @generated from field: com.hearlers.v1.model.ProgressType progress_type = 3;
   */
  progressType: ProgressType;

  /**
   * @generated from field: com.hearlers.v1.model.ProgressStatus status = 4;
   */
  status: ProgressStatus;

  /**
   * @generated from field: string last_updated = 5;
   */
  lastUpdated: string;

  /**
   * @generated from field: string created_at = 6;
   */
  createdAt: string;

  /**
   * @generated from field: string updated_at = 7;
   */
  updatedAt: string;

  /**
   * @generated from field: string deleted_at = 8;
   */
  deletedAt: string;
};

/**
 * Describes the message com.hearlers.v1.model.UserProgress.
 * Use `create(UserProgressSchema)` to create a new message.
 */
export const UserProgressSchema: GenMessage<UserProgress> = /*@__PURE__*/
  messageDesc(file_v1_model_user, 2);

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
   * @generated from enum value: PROGRESS_TYPE_PROFILE_COMPLETION = 1;
   */
  PROFILE_COMPLETION = 1,

  /**
   * @generated from enum value: PROGRESS_TYPE_VERIFICATION = 2;
   */
  VERIFICATION = 2,

  /**
   * @generated from enum value: PROGRESS_TYPE_SUBSCRIPTION = 3;
   */
  SUBSCRIPTION = 3,

  /**
   * @generated from enum value: PROGRESS_TYPE_FIRST_SESSION = 4;
   */
  FIRST_SESSION = 4,

  /**
   * @generated from enum value: PROGRESS_TYPE_REVIEW = 5;
   */
  REVIEW = 5,
}

/**
 * Describes the enum com.hearlers.v1.model.ProgressType.
 */
export const ProgressTypeSchema: GenEnum<ProgressType> = /*@__PURE__*/
  enumDesc(file_v1_model_user, 3);

