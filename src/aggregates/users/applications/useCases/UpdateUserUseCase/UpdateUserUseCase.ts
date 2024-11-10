import { Inject, Injectable } from "@nestjs/common";
import { UpdateUserUseCaseRequest } from "~/src/aggregates/users/applications/useCases/UpdateUserUseCase/dto/UpdateUserUseCase.request";
import { UpdateUserUseCaseResponse } from "~/src/aggregates/users/applications/useCases/UpdateUserUseCase/dto/UpdateUserUseCase.response";
import { Kakao } from "~/src/aggregates/users/domain/Kakao";
import { Users, UsersProps } from "~/src/aggregates/users/domain/Users";
import { USER_REPOSITORY, UsersRepositoryPort } from "~/src/aggregates/users/infrastructures/users.repository.port";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { AuthChannel } from "~/src/gen/v1/model/user_pb";

@Injectable()
export class UpdateUserUseCase implements UseCase<UpdateUserUseCaseRequest, UpdateUserUseCaseResponse> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UsersRepositoryPort,
  ) {}

  async execute(request?: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const { authChannel, uniqueId } = request;
    // 기존 유저 찾기
    const user = await this.usersRepository.findOne({ userId: request.userId });
    if (!user) {
      return {
        ok: false,
        error: "User not found",
      };
    }
    // 업데이트 할 유저 생성
    const updateProps = this.getUpdateProps(request, user);
    const updatedUserOrError = Users.create(updateProps, user.id);
    if (updatedUserOrError.isFailure) {
      return {
        ok: false,
        error: updatedUserOrError.error,
      };
    }
    // 인증 채널 연동 시
    const updatedUser = updatedUserOrError.value;
    if (authChannel === AuthChannel.KAKAO && uniqueId) {
      const kakaoOrError = Kakao.createNew({ userId: user.id, uniqueId });
      if (kakaoOrError.isFailure) {
        return {
          ok: false,
          error: kakaoOrError.error,
        };
      }

      const updatedResult = updatedUser.setKakao(kakaoOrError.value);
      if (updatedResult.isFailure) {
        return {
          ok: false,
          error: updatedResult.error,
        };
      }
    }
    // 업데이트 유저 저장
    const savedUser = await this.usersRepository.update(updatedUser);
    return {
      ok: true,
      user: savedUser,
    };
  }

  private getUpdateProps(request: UpdateUserUseCaseRequest, originalUser: Users): UsersProps {
    const { nickname, authChannel } = request;
    const props = originalUser.propsValue;
    if (nickname) {
      props.nickname = nickname;
    }
    if (authChannel) {
      props.authChannel = authChannel;
    }
    return props;
  }
}
