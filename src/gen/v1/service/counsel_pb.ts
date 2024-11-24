// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file v1/service/counsel.proto (package com.hearlers.v1.service, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Counsel, CounselMessage, CounselorType } from "../model/counsel_pb";
import { file_v1_model_counsel } from "../model/counsel_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file v1/service/counsel.proto.
 */
export const file_v1_service_counsel: GenFile = /*@__PURE__*/
  fileDesc("Chh2MS9zZXJ2aWNlL2NvdW5zZWwucHJvdG8SF2NvbS5oZWFybGVycy52MS5zZXJ2aWNlImUKFENyZWF0ZUNvdW5zZWxSZXF1ZXN0Eg8KB3VzZXJfaWQYASABKAUSPAoOY291bnNlbG9yX3R5cGUYAiABKA4yJC5jb20uaGVhcmxlcnMudjEubW9kZWwuQ291bnNlbG9yVHlwZSKHAQoTQ3JlYXRlQ291bnNlbFJlc3VsdBIvCgdjb3Vuc2VsGAEgASgLMh4uY29tLmhlYXJsZXJzLnYxLm1vZGVsLkNvdW5zZWwSPwoQY291bnNlbF9tZXNzYWdlcxgCIAMoCzIlLmNvbS5oZWFybGVycy52MS5tb2RlbC5Db3Vuc2VsTWVzc2FnZSIoChVHZXRDb3Vuc2VsTGlzdFJlcXVlc3QSDwoHdXNlcl9pZBgBIAEoBSJMChRHZXRDb3Vuc2VsTGlzdFJlc3VsdBI0Cgxjb3Vuc2VsX2xpc3QYASADKAsyHi5jb20uaGVhcmxlcnMudjEubW9kZWwuQ291bnNlbCI9ChZHZW5lcmF0ZU1lc3NhZ2VSZXF1ZXN0EhIKCmNvdW5zZWxfaWQYASABKAUSDwoHbWVzc2FnZRgCIAEoCSJXChVHZW5lcmF0ZU1lc3NhZ2VSZXN1bHQSPgoPY291bnNlbF9tZXNzYWdlGAEgASgLMiUuY29tLmhlYXJsZXJzLnYxLm1vZGVsLkNvdW5zZWxNZXNzYWdlMuMCCg5Db3Vuc2VsU2VydmljZRJsCg1DcmVhdGVDb3Vuc2VsEi0uY29tLmhlYXJsZXJzLnYxLnNlcnZpY2UuQ3JlYXRlQ291bnNlbFJlcXVlc3QaLC5jb20uaGVhcmxlcnMudjEuc2VydmljZS5DcmVhdGVDb3Vuc2VsUmVzdWx0Em8KDkdldENvdW5zZWxMaXN0Ei4uY29tLmhlYXJsZXJzLnYxLnNlcnZpY2UuR2V0Q291bnNlbExpc3RSZXF1ZXN0Gi0uY29tLmhlYXJsZXJzLnYxLnNlcnZpY2UuR2V0Q291bnNlbExpc3RSZXN1bHQScgoPR2VuZXJhdGVNZXNzYWdlEi8uY29tLmhlYXJsZXJzLnYxLnNlcnZpY2UuR2VuZXJhdGVNZXNzYWdlUmVxdWVzdBouLmNvbS5oZWFybGVycy52MS5zZXJ2aWNlLkdlbmVyYXRlTWVzc2FnZVJlc3VsdEKrAQobY29tLmNvbS5oZWFybGVycy52MS5zZXJ2aWNlQgxDb3Vuc2VsUHJvdG9QAaICBENIVlOqAhdDb20uSGVhcmxlcnMuVjEuU2VydmljZcoCF0NvbVxIZWFybGVyc1xWMVxTZXJ2aWNl4gIjQ29tXEhlYXJsZXJzXFYxXFNlcnZpY2VcR1BCTWV0YWRhdGHqAhpDb206OkhlYXJsZXJzOjpWMTo6U2VydmljZWIGcHJvdG8z", [file_v1_model_counsel]);

/**
 * @generated from message com.hearlers.v1.service.CreateCounselRequest
 */
export type CreateCounselRequest = Message<"com.hearlers.v1.service.CreateCounselRequest"> & {
  /**
   * @generated from field: int32 user_id = 1;
   */
  userId: number;

  /**
   * @generated from field: com.hearlers.v1.model.CounselorType counselor_type = 2;
   */
  counselorType: CounselorType;
};

/**
 * Describes the message com.hearlers.v1.service.CreateCounselRequest.
 * Use `create(CreateCounselRequestSchema)` to create a new message.
 */
export const CreateCounselRequestSchema: GenMessage<CreateCounselRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_counsel, 0);

/**
 * @generated from message com.hearlers.v1.service.CreateCounselResult
 */
export type CreateCounselResult = Message<"com.hearlers.v1.service.CreateCounselResult"> & {
  /**
   * @generated from field: com.hearlers.v1.model.Counsel counsel = 1;
   */
  counsel?: Counsel;

  /**
   * @generated from field: repeated com.hearlers.v1.model.CounselMessage counsel_messages = 2;
   */
  counselMessages: CounselMessage[];
};

/**
 * Describes the message com.hearlers.v1.service.CreateCounselResult.
 * Use `create(CreateCounselResultSchema)` to create a new message.
 */
export const CreateCounselResultSchema: GenMessage<CreateCounselResult> = /*@__PURE__*/
  messageDesc(file_v1_service_counsel, 1);

/**
 * @generated from message com.hearlers.v1.service.GetCounselListRequest
 */
export type GetCounselListRequest = Message<"com.hearlers.v1.service.GetCounselListRequest"> & {
  /**
   * @generated from field: int32 user_id = 1;
   */
  userId: number;
};

/**
 * Describes the message com.hearlers.v1.service.GetCounselListRequest.
 * Use `create(GetCounselListRequestSchema)` to create a new message.
 */
export const GetCounselListRequestSchema: GenMessage<GetCounselListRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_counsel, 2);

/**
 * @generated from message com.hearlers.v1.service.GetCounselListResult
 */
export type GetCounselListResult = Message<"com.hearlers.v1.service.GetCounselListResult"> & {
  /**
   * @generated from field: repeated com.hearlers.v1.model.Counsel counsel_list = 1;
   */
  counselList: Counsel[];
};

/**
 * Describes the message com.hearlers.v1.service.GetCounselListResult.
 * Use `create(GetCounselListResultSchema)` to create a new message.
 */
export const GetCounselListResultSchema: GenMessage<GetCounselListResult> = /*@__PURE__*/
  messageDesc(file_v1_service_counsel, 3);

/**
 * @generated from message com.hearlers.v1.service.GenerateMessageRequest
 */
export type GenerateMessageRequest = Message<"com.hearlers.v1.service.GenerateMessageRequest"> & {
  /**
   * @generated from field: int32 counsel_id = 1;
   */
  counselId: number;

  /**
   * @generated from field: string message = 2;
   */
  message: string;
};

/**
 * Describes the message com.hearlers.v1.service.GenerateMessageRequest.
 * Use `create(GenerateMessageRequestSchema)` to create a new message.
 */
export const GenerateMessageRequestSchema: GenMessage<GenerateMessageRequest> = /*@__PURE__*/
  messageDesc(file_v1_service_counsel, 4);

/**
 * @generated from message com.hearlers.v1.service.GenerateMessageResult
 */
export type GenerateMessageResult = Message<"com.hearlers.v1.service.GenerateMessageResult"> & {
  /**
   * @generated from field: com.hearlers.v1.model.CounselMessage counsel_message = 1;
   */
  counselMessage?: CounselMessage;
};

/**
 * Describes the message com.hearlers.v1.service.GenerateMessageResult.
 * Use `create(GenerateMessageResultSchema)` to create a new message.
 */
export const GenerateMessageResultSchema: GenMessage<GenerateMessageResult> = /*@__PURE__*/
  messageDesc(file_v1_service_counsel, 5);

/**
 * @generated from service com.hearlers.v1.service.CounselService
 */
export const CounselService: GenService<{
  /**
   * @generated from rpc com.hearlers.v1.service.CounselService.CreateCounsel
   */
  createCounsel: {
    methodKind: "unary";
    input: typeof CreateCounselRequestSchema;
    output: typeof CreateCounselResultSchema;
  },
  /**
   * @generated from rpc com.hearlers.v1.service.CounselService.GetCounselList
   */
  getCounselList: {
    methodKind: "unary";
    input: typeof GetCounselListRequestSchema;
    output: typeof GetCounselListResultSchema;
  },
  /**
   * @generated from rpc com.hearlers.v1.service.CounselService.GenerateMessage
   */
  generateMessage: {
    methodKind: "unary";
    input: typeof GenerateMessageRequestSchema;
    output: typeof GenerateMessageResultSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_v1_service_counsel, 0);
