import { create } from "@bufbuild/protobuf";
import { Controller } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";
import { GetCounselListQuery } from "~/src/aggregates/counsels/applications/queries/GetCounselList/GetCounselList.query";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import {
  GetCounselListRequest,
  GetCounselListResult,
  GetCounselListResultSchema,
  GetMessageListRequest,
  GetMessageListResult,
  GetMessageListResultSchema,
} from "~/src/gen/v1/service/counsel_pb";
import { SchemaCounselsMapper } from "../schema.counsels.mapper";
import { GetMessageListQuery } from "~/src/aggregates/counselMessages/applications/queries/GetMessageList/GetMessageList.query";
import { CounselMessages } from "~/src/aggregates/counselMessages/domain/CounselMessages";

@Controller("counsel")
export class GrpcCounselQueryController {
  constructor(private readonly queryBus: QueryBus) {}

  @GrpcMethod("CounselService", "GetCounselList")
  async getCounselList(data: GetCounselListRequest): Promise<GetCounselListResult> {
    const query: GetCounselListQuery = new GetCounselListQuery({ userId: data.userId });
    const counselList: Counsels[] = await this.queryBus.execute(query);

    return create(GetCounselListResultSchema, { counselList: counselList.map((counsel) => SchemaCounselsMapper.toCounselProto(counsel)) });
  }

  @GrpcMethod("CounselService", "GetMessageList")
  async getMessageList(data: GetMessageListRequest): Promise<GetMessageListResult> {
    const query: GetMessageListQuery = new GetMessageListQuery({ counselId: data.counselId });
    const counselMessageList: CounselMessages[] = await this.queryBus.execute(query);

    return create(GetMessageListResultSchema, {
      messageList: counselMessageList.map((counselMessage) => SchemaCounselsMapper.toCounselMessageProto(counselMessage)),
    });
  }
}
