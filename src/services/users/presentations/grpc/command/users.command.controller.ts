import { create } from "@bufbuild/protobuf";
import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateUserCommand } from "~/src/aggregates/users/applications/commands/CreateUser/CreateUser.command";
import { UpdateUserCommand } from "~/src/aggregates/users/applications/commands/UpdateUser/UpdateUser.command";
import { Users } from "~/src/aggregates/users/domain/Users";
import {
  CreateUserRequest,
  CreateUserResult,
  CreateUserResultSchema,
  UpdateUserRequest,
  UpdateUserResult,
  UpdateUserResultSchema,
} from "~/src/gen/v1/service/user_pb";
import { SchemaUsersMapper } from "~/src/services/users/presentations/grpc/schema.users.mapper";

@Controller("user")
export class GrpcUserCommandController {
  constructor(private readonly commandBus: CommandBus) {}

  @GrpcMethod("UserService", "create")
  async createUser(request: CreateUserRequest): Promise<CreateUserResult> {
    const command: CreateUserCommand = new CreateUserCommand({
      nickname: request.nickname,
      authChannel: request.authChannel,
    });
    const user: Users = await this.commandBus.execute(command);
    return create(CreateUserResultSchema, { user: SchemaUsersMapper.toUserProto(user) });
  }

  @GrpcMethod("UserService", "update")
  async updateUser(request: UpdateUserRequest): Promise<UpdateUserResult> {
    console.log(request);
    const command: UpdateUserCommand = new UpdateUserCommand({
      userId: request.userId,
      nickname: request.nickname,
      authChannel: request.authChannel,
      uniqueId: request.uniqueId,
      userProfile: request.userProfile,
    });
    console.log(command);

    const user: Users = await this.commandBus.execute(command);
    return create(UpdateUserResultSchema, { user: SchemaUsersMapper.toUserProto(user) });
  }
}
