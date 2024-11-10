import { fakerKO as faker } from "@faker-js/faker";

import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { AuthChannel } from "~/src/shared/enums/AuthChannel.enum";
import { Gender } from "~/src/shared/enums/Gender.enum";
import { ProgressType } from "~/src/shared/enums/ProgressType.enum";
import { EmotionalState } from "~/src/shared/enums/EmotionalState.enum";
import { Users } from "~/src/aggregates/users/domain/Users";
import { UserProfiles } from "~/src/aggregates/users/domain/UserProfiles";
import { UserProgresses } from "~/src/aggregates/users/domain/UserProgresses";
import { UserPrompts } from "~/src/aggregates/users/domain/UserPrompts";
import { convertDayjs } from "~/src/shared/utils/Date.utils";
import { ProgressStatus } from "~/src/shared/enums/ProgressStatus.enum";

describe("Users", () => {
  const validNickname = "테스트유저";
  const validPhoneNumber = "01012345678";

  describe("createNew", () => {
    it("새로운 Users를 생성할 수 있다", () => {
      const result = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.KAKAO,
      });

      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        const user = result.value;
        expect(user.nickname).toBe(validNickname);
        expect(user.authChannel).toBe(AuthChannel.KAKAO);
        expect(user.userProfile).toBeDefined();
        expect(user.userProgresses).toHaveLength(0);
        expect(user.userPrompts).toHaveLength(0);
        expect(user.isNew()).toBe(true);
      }
    });

    it("닉네임이 없으면 생성에 실패한다", () => {
      const result = Users.createNew({
        nickname: "",
        authChannel: AuthChannel.KAKAO,
      });

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain("[Users] 닉네임은 필수입니다");
    });

    it("닉네임이 너무 짧거나 길면 생성에 실패한다", () => {
      const shortResult = Users.createNew({
        nickname: "a",
        authChannel: AuthChannel.KAKAO,
      });

      expect(shortResult.isFailure).toBe(true);
      expect(shortResult.error).toContain("[Users] 닉네임은 2-20자 사이여야 합니다");

      const longResult = Users.createNew({
        nickname: "a".repeat(21),
        authChannel: AuthChannel.KAKAO,
      });

      expect(longResult.isFailure).toBe(true);
      expect(longResult.error).toContain("[Users] 닉네임은 2-20자 사이여야 합니다");
    });
  });

  describe("setProfile", () => {
    it("프로필을 설정할 수 있다", () => {
      const user = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const profileResult = UserProfiles.createNew({
        userId: user.id,
        profileImage: faker.image.avatar(),
        phoneNumber: validPhoneNumber,
        gender: Gender.MALE,
        birthday: convertDayjs("1990-01-01"),
        introduction: faker.lorem.paragraph(),
      });

      expect(profileResult.isSuccess).toBe(true);
      if (profileResult.isSuccess) {
        const result = user.setProfile(profileResult.value);
        expect(result.isSuccess).toBe(true);
        expect(user.userProfile).toBeDefined();
        expect(user.userProfile?.userId.equals(user.id)).toBe(true);
      }
    });

    it("다른 사용자의 프로필은 설정할 수 없다", () => {
      const user = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const profileResult = UserProfiles.createNew({
        userId: new UniqueEntityId(999),
        profileImage: faker.image.avatar(),
        phoneNumber: validPhoneNumber,
        gender: Gender.MALE,
        birthday: convertDayjs("1990-01-01"),
        introduction: faker.lorem.paragraph(),
      });

      expect(profileResult.isSuccess).toBe(true);
      if (profileResult.isSuccess) {
        const result = user.setProfile(profileResult.value);
        expect(result.isFailure).toBe(true);
        expect(result.error).toContain("[Users] 프로필의 사용자 ID가 일치하지 않습니다");
      }
    });
  });

  describe("addProgress", () => {
    it("진행 상태를 추가할 수 있다", () => {
      const user = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const progressResult = UserProgresses.createNew({
        userId: user.id,
        progressType: ProgressType.FIRST_SESSION,
        status: ProgressStatus.IN_PROGRESS,
      });

      expect(progressResult.isSuccess).toBe(true);
      if (progressResult.isSuccess) {
        const result = user.addProgress(progressResult.value);
        expect(result.isSuccess).toBe(true);
        expect(user.userProgresses).toHaveLength(1);
        expect(user.userProgresses[0].userId.equals(user.id)).toBe(true);
      }
    });
  });

  describe("addPrompt", () => {
    it("프롬프트를 추가할 수 있다", () => {
      const user = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const promptResult = UserPrompts.createNew({
        userId: user.id,
        templateId: new UniqueEntityId(1),
        context: {
          emotionalState: EmotionalState.ANGRY,
          recentEvents: [faker.lorem.sentence()],
        },
      });

      expect(promptResult.isSuccess).toBe(true);
      if (promptResult.isSuccess) {
        const result = user.addPrompt(promptResult.value);
        expect(result.isSuccess).toBe(true);
        expect(user.userPrompts).toHaveLength(1);
        expect(user.userPrompts[0].userId.equals(user.id)).toBe(true);
      }
    });
  });

  describe("updateNickname", () => {
    it("닉네임을 업데이트할 수 있다", () => {
      const user = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const newNickname = "새로운닉네임";
      const result = user.updateNickname(newNickname);

      expect(result.isSuccess).toBe(true);
      expect(user.nickname).toBe(newNickname);
    });

    it("유효하지 않은 닉네임으로 업데이트하면 실패한다", () => {
      const user = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const result = user.updateNickname("a");

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain("[Users] 닉네임은 2-20자 사이여야 합니다");
      expect(user.nickname).toBe(validNickname); // 원래 값 유지
    });
  });

  describe("updateAuthChannel", () => {
    it("인증 채널을 업데이트할 수 있다", () => {
      const user = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.NONE,
      }).value as Users;

      const result = user.updateAuthChannel(AuthChannel.KAKAO);

      expect(result.isSuccess).toBe(true);
      expect(user.authChannel).toBe(AuthChannel.KAKAO);
    });

    it("유효하지 않은 인증 채널로 업데이트하면 실패한다", () => {
      const user = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const result = user.updateAuthChannel("INVALID" as unknown as AuthChannel);

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain("[Users] 유효하지 않은 인증 채널입니다");
      expect(user.authChannel).toBe(AuthChannel.KAKAO); // 원래 값 유지
    });
  });

  describe("delete/restore", () => {
    it("삭제하고 복구할 수 있다", () => {
      const user = Users.createNew({
        nickname: validNickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      expect(user.deletedAt).toBeNull();

      user.delete();
      expect(user.deletedAt).not.toBeNull();

      user.restore();
      expect(user.deletedAt).toBeNull();
    });
  });
});
