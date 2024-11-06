import { create } from "@bufbuild/protobuf";
import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateUserCommand } from "~/src/aggregates/users/applications/commands/CreateUser/CreateUser.command";
import { Users } from "~/src/aggregates/users/domain/Users";
import { CreateUserRequest, CreateUserResult, CreateUserResultSchema } from "~/src/gen/v1/service/user_pb";
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
}
