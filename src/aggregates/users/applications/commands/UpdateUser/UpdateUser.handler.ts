import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "./UpdateUser.command";
import { FindOneUserUseCase } from "../../useCases/FindOneUserUseCase/FindOneUserUseCase";
import { UpdateUserUseCase } from "../../useCases/UpdateUserUseCase/UpdateUserUseCase";
import { Kakao } from "~/src/aggregates/users/domain/Kakao";
import { Users, UsersProps } from "~/src/aggregates/users/domain/Users";
import { AuthChannel, ProgressStatus, ProgressType } from "~/src/gen/v1/model/user_pb";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { Result } from "~/src/shared/core/domain/Result";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  async execute(command: UpdateUserCommand): Promise<Users> {
    const { userId, authChannel, uniqueId } = command.props;

    // 기존 사용자 조회
    const findOneUserUseCaseResponse = await this.findOneUserUseCase.execute({ userId });
    if (!findOneUserUseCaseResponse.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.NOT_FOUND, findOneUserUseCaseResponse.error);
    }
    const originalUser = findOneUserUseCaseResponse.user;

    // 업데이트할 사용자 생성
    const updateProps = this.getUpdateProps(command, originalUser);
    const toUpdateUserOrError = Users.create(updateProps, originalUser.id);
    if (toUpdateUserOrError.isFailure) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, toUpdateUserOrError.error);
    }
    const toUpdateUser = toUpdateUserOrError.value;

    // 카카오 인증 처리
    if (authChannel === AuthChannel.KAKAO && uniqueId) {
      const authResult = this.handleKakaoAuth(toUpdateUser, uniqueId);
      if (authResult.isFailure) {
        throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, authResult.error);
      }
    }

    // 사용자 업데이트
    const updateUserUseCaseResponse = await this.updateUserUseCase.execute({ toUpdateUser });
    if (!updateUserUseCaseResponse.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, updateUserUseCaseResponse.error);
    }
    return updateUserUseCaseResponse.user;
  }

  private getUpdateProps(command: UpdateUserCommand, originalUser: Users): UsersProps {
    const { nickname, authChannel } = command.props;
    const props = originalUser.propsValue;
    if (nickname) props.nickname = nickname;
    if (authChannel) props.authChannel = authChannel;
    return props;
  }

  private handleKakaoAuth(user: Users, uniqueId: string): Result<void> {
    const kakaoOrError = Kakao.createNew({ userId: user.id, uniqueId });
    if (kakaoOrError.isFailure) {
      return Result.fail(kakaoOrError.error);
    }

    const updatedResult = user.setKakao(kakaoOrError.value);
    if (updatedResult.isFailure) {
      return Result.fail(updatedResult.error);
    }

    const verificationProgress = user.findProgress(ProgressType.VERIFICATION);
    if (verificationProgress) {
      verificationProgress.updateStatus(ProgressStatus.COMPLETED);
    }

    return Result.ok();
  }
}
