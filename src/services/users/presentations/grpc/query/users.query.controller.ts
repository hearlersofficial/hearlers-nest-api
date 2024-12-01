import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

import { QueryBus } from "@nestjs/cqrs";
import { FindOneUserQuery } from "~/src/aggregates/users/applications/queries/FindOneUser/FindOneUser.query";
import { Users } from "~/src/aggregates/users/domain/Users";
import { create } from "@bufbuild/protobuf";
import { FindOneUserRequest, FindOneUserResponse, FindOneUserResponseSchema } from "~/src/gen/v1/service/user_pb";
import { SchemaUsersMapper } from "~/src/services/users/presentations/grpc/schema.users.mapper";

@Controller("user")
export class GrpcUserQueryController {
  constructor(private readonly queryBus: QueryBus) {}

  @GrpcMethod("UserService", "findOne")
  async findOneUser(data: FindOneUserRequest): Promise<FindOneUserResponse> {
    const query: FindOneUserQuery = new FindOneUserQuery({ userId: data.userId });
    const user: Users = await this.queryBus.execute(query);

    return create(FindOneUserResponseSchema, { user: SchemaUsersMapper.toUserProto(user) });
  }
}
