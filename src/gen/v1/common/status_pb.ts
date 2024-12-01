// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file v1/common/status.proto (package com.hearlers.v1.common, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc } from "@bufbuild/protobuf/codegenv1";

/**
 * Describes the file v1/common/status.proto.
 */
export const file_v1_common_status: GenFile = /*@__PURE__*/
  fileDesc("ChZ2MS9jb21tb24vc3RhdHVzLnByb3RvEhZjb20uaGVhcmxlcnMudjEuY29tbW9uKj4KCkNvcmVTdGF0dXMSFgoSQ09SRV9TVEFUVVNfQUNUSVZFEAASGAoUQ09SRV9TVEFUVVNfSU5BQ1RJVkUQAUKlAQoaY29tLmNvbS5oZWFybGVycy52MS5jb21tb25CC1N0YXR1c1Byb3RvUAGiAgRDSFZDqgIWQ29tLkhlYXJsZXJzLlYxLkNvbW1vbsoCFkNvbVxIZWFybGVyc1xWMVxDb21tb27iAiJDb21cSGVhcmxlcnNcVjFcQ29tbW9uXEdQQk1ldGFkYXRh6gIZQ29tOjpIZWFybGVyczo6VjE6OkNvbW1vbmIGcHJvdG8z");

/**
 * @generated from enum com.hearlers.v1.common.CoreStatus
 */
export enum CoreStatus {
  /**
   * @generated from enum value: CORE_STATUS_ACTIVE = 0;
   */
  ACTIVE = 0,

  /**
   * @generated from enum value: CORE_STATUS_INACTIVE = 1;
   */
  INACTIVE = 1,
}

/**
 * Describes the enum com.hearlers.v1.common.CoreStatus.
 */
export const CoreStatusSchema: GenEnum<CoreStatus> = /*@__PURE__*/
  enumDesc(file_v1_common_status, 0);
