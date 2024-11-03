import { Dayjs } from "dayjs";

import { AggregateRoot } from "~/src/shared/core/domain/AggregateRoot";
import { UniqueEntityID } from "~/src/shared/core/domain/UniqueEntityID";
import { Result } from "~/src/shared/core/domain/Result";
import { getNowDayjs } from "~/src/shared/utils/Date.utils";
import { AuthChannel } from "~/src/shared/enums/AuthChannel.enum";

interface UsersNewProps {
  nickname: string;
  profileImage: string;
  phoneNumber: string;
  authChannel: AuthChannel;
}

export interface UsersProps extends UsersNewProps {
  createdAt: Dayjs;
  updatedAt: Dayjs;
  deletedAt: Dayjs | null;
}

export class Users extends AggregateRoot<UsersProps> {
  private constructor(props: UsersProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UsersProps, id: UniqueEntityID): Result<Users> {
    return Result.ok<Users>(new Users(props, id));
  }

  public static createNew(props: UsersNewProps): Result<Users> {
    const nowDayjs: Dayjs = getNowDayjs();

    return this.create(
      {
        ...props,
        createdAt: nowDayjs,
        updatedAt: nowDayjs,
        deletedAt: null,
      },
      new UniqueEntityID(),
    );
  }

  get nickname(): string {
    return this.props.nickname;
  }

  get profileImage(): string {
    return this.props.profileImage;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get authChannel(): AuthChannel {
    return this.props.authChannel;
  }

  get createdAt(): Dayjs {
    return this.props.createdAt;
  }

  get updatedAt(): Dayjs {
    return this.props.updatedAt;
  }

  get deletedAt(): Dayjs {
    return this.props.deletedAt;
  }
}
