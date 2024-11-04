import { create } from "@bufbuild/protobuf";
import { Users } from "~/src/aggregates/users/domain/Users";
import { User, UserSchema } from "~/src/gen/v1/model/user_pb";
import { dayjsToProtobufTimestamp } from "~/src/shared/utils/Date.utils";

export class SchemaUsersMapper {
  static toUserProto(user: Users): User {
    return create(UserSchema, {
      id: BigInt(user.id.getNumber()),
      authChannel: user.authChannel,
      createdAt: dayjsToProtobufTimestamp(user.createdAt),
      updatedAt: dayjsToProtobufTimestamp(user.updatedAt),
      deletedAt: user.deletedAt ? dayjsToProtobufTimestamp(user.deletedAt) : null,
    });
  }
}
