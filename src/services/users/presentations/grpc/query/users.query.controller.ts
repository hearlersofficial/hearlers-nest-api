import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { QueryBus } from "@nestjs/cqrs";
import { FindOneUserQuery } from "~/src/aggregates/users/applications/queries/FindOneUser/FindOneUser.query";
import { Users } from "~/src/aggregates/users/domain/Users";
import { create } from "@bufbuild/protobuf";
import {
  FindOneAuthUserRequest,
  FindOneAuthUserResponse,
  FindOneAuthUserResponseSchema,
  FindOneUserRequest,
  FindOneUserResponse,
  FindOneUserResponseSchema,
} from "~/src/gen/v1/service/user_pb";
import { SchemaUsersMapper } from "~/src/services/users/presentations/grpc/schema.users.mapper";
import { FindOneAuthUserQuery } from "~/src/aggregates/authUsers/applications/queries/FindOneAuthUser/FindOneAuthUser.query";
import { SchemaAuthUsersMapper } from "~/src/services/users/presentations/grpc/schema.authUsers.mapper";

@Controller("user")
export class GrpcUserQueryController {
  constructor(private readonly queryBus: QueryBus) {}

  @GrpcMethod("UserService", "FindOneUser")
  async findOneUser(data: FindOneUserRequest): Promise<FindOneUserResponse> {
    const query: FindOneUserQuery = new FindOneUserQuery({ userId: data.userId, nickname: data.nickname });
    const user: Users = await this.queryBus.execute(query);

    return create(FindOneUserResponseSchema, { user: SchemaUsersMapper.toUserProto(user) });
  }

  @GrpcMethod("UserService", "FindOneAuthUser")
  async findOneAuthUser(data: FindOneAuthUserRequest): Promise<FindOneAuthUserResponse> {
    const query: FindOneAuthUserQuery = new FindOneAuthUserQuery({
      authUserId: data.authUserId,
      userId: data.userId,
      authChannel: data.authChannel,
      uniqueId: data.uniqueId,
    });
    const { authUser } = await this.queryBus.execute(query);
    return create(FindOneAuthUserResponseSchema, { authUser: SchemaAuthUsersMapper.toAuthUserProto(authUser) });
  }
}
