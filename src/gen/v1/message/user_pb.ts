// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file v1/message/user.proto (package com.hearlers.v1.message, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { AuthChannel } from "../model/auth_user_pb";
import { file_v1_model_auth_user } from "../model/auth_user_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file v1/message/user.proto.
 */
export const file_v1_message_user: GenFile = /*@__PURE__*/
  fileDesc("ChV2MS9tZXNzYWdlL3VzZXIucHJvdG8SF2NvbS5oZWFybGVycy52MS5tZXNzYWdlIpABChJVc2VyVXBkYXRlZFBheWxvYWQSDwoHdXNlcl9pZBgBIAEoBRI4CgxhdXRoX2NoYW5uZWwYAiABKA4yIi5jb20uaGVhcmxlcnMudjEubW9kZWwuQXV0aENoYW5uZWwSLwoLb2NjdXJyZWRfYXQYAyABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQqgBChtjb20uY29tLmhlYXJsZXJzLnYxLm1lc3NhZ2VCCVVzZXJQcm90b1ABogIEQ0hWTaoCF0NvbS5IZWFybGVycy5WMS5NZXNzYWdlygIXQ29tXEhlYXJsZXJzXFYxXE1lc3NhZ2XiAiNDb21cSGVhcmxlcnNcVjFcTWVzc2FnZVxHUEJNZXRhZGF0YeoCGkNvbTo6SGVhcmxlcnM6OlYxOjpNZXNzYWdlYgZwcm90bzM", [file_google_protobuf_timestamp, file_v1_model_auth_user]);

/**
 * topic: user.updated
 *
 * @generated from message com.hearlers.v1.message.UserUpdatedPayload
 */
export type UserUpdatedPayload = Message<"com.hearlers.v1.message.UserUpdatedPayload"> & {
  /**
   * @generated from field: int32 user_id = 1;
   */
  userId: number;

  /**
   * @generated from field: com.hearlers.v1.model.AuthChannel auth_channel = 2;
   */
  authChannel: AuthChannel;

  /**
   * @generated from field: google.protobuf.Timestamp occurred_at = 3;
   */
  occurredAt?: Timestamp;
};

/**
 * Describes the message com.hearlers.v1.message.UserUpdatedPayload.
 * Use `create(UserUpdatedPayloadSchema)` to create a new message.
 */
export const UserUpdatedPayloadSchema: GenMessage<UserUpdatedPayload> = /*@__PURE__*/
  messageDesc(file_v1_message_user, 0);

