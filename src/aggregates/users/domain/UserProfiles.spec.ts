import { fakerKO as faker } from "@faker-js/faker";
import { UserProfiles } from "./UserProfiles";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { Gender } from "~/src/shared/enums/Gender.enum";
import { getNowDayjs } from "~/src/shared/utils/Date.utils";

describe("UserProfiles", () => {
  const validPhoneNumber = "01012345678";

  describe("createNew", () => {
    it("새로운 UserProfile을 생성할 수 있다", () => {
      const userId = new UniqueEntityId(faker.number.int());
      const result = UserProfiles.createNew({
        userId,
        profileImage: faker.image.avatar(),
        phoneNumber: validPhoneNumber,
        gender: Gender.MALE,
        birthday: "1990-01-01",
        introduction: faker.lorem.paragraph(),
      });

      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        const profile = result.value;
        expect(profile.userId.equals(userId)).toBe(true);
        expect(profile.phoneNumber).toBe(validPhoneNumber);
        expect(profile.gender).toBe(Gender.MALE);
        expect(profile.isNew()).toBe(true);
      }
    });

    it("필수 값이 없으면 생성에 실패한다", () => {
      const result = UserProfiles.createNew({
        userId: new UniqueEntityId(faker.number.int()),
        profileImage: "", // 빈 문자열
        phoneNumber: validPhoneNumber,
        gender: Gender.MALE,
      });

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain("[UserProfiles] 프로필 이미지는 필수입니다");
    });

    it("유효하지 않은 전화번호로 생성하면 실패한다", () => {
      const result = UserProfiles.createNew({
        userId: new UniqueEntityId(faker.number.int()),
        profileImage: faker.image.avatar(),
        phoneNumber: "invalid-phone",
        gender: Gender.MALE,
      });

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain("[UserProfiles] 유효하지 않은 전화번호 형식입니다");
    });
  });

  describe("create", () => {
    it("기존 데이터로 UserProfile을 생성할 수 있다", () => {
      const now = getNowDayjs();
      const props = {
        userId: new UniqueEntityId(faker.number.int()),
        profileImage: faker.image.avatar(),
        phoneNumber: validPhoneNumber,
        gender: Gender.FEMALE,
        birthday: "1990-01-01",
        introduction: faker.lorem.paragraph(),
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      };

      const result = UserProfiles.create(props, new UniqueEntityId(1));

      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        const profile = result.value;
        expect(profile.userId.equals(props.userId)).toBe(true);
        expect(profile.phoneNumber).toBe(props.phoneNumber);
        expect(profile.gender).toBe(props.gender);
      }
    });
  });

  describe("updateProfile", () => {
    it("프로필 정보를 업데이트할 수 있다", () => {
      const profile = UserProfiles.createNew({
        userId: new UniqueEntityId(faker.number.int()),
        profileImage: faker.image.avatar(),
        phoneNumber: validPhoneNumber,
        gender: Gender.MALE,
      }).value as UserProfiles;

      const newPhoneNumber = "01087654321";
      const newIntroduction = faker.lorem.paragraph();

      const result = profile.updateProfile({
        phoneNumber: newPhoneNumber,
        introduction: newIntroduction,
      });

      expect(result.isSuccess).toBe(true);
      expect(profile.phoneNumber).toBe(newPhoneNumber);
      expect(profile.introduction).toBe(newIntroduction);
    });

    it("유효하지 않은 전화번호로 업데이트하면 실패한다", () => {
      const profile = UserProfiles.createNew({
        userId: new UniqueEntityId(faker.number.int()),
        profileImage: faker.image.avatar(),
        phoneNumber: validPhoneNumber,
        gender: Gender.MALE,
      }).value as UserProfiles;

      const result = profile.updateProfile({
        phoneNumber: "invalid-phone",
      });

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain("[UserProfiles] 유효하지 않은 전화번호 형식입니다");
      expect(profile.phoneNumber).toBe(validPhoneNumber); // 원래 값 유지
    });

    it("자기소개가 500자를 초과하면 업데이트에 실패한다", () => {
      const profile = UserProfiles.createNew({
        userId: new UniqueEntityId(faker.number.int()),
        profileImage: faker.image.avatar(),
        phoneNumber: validPhoneNumber,
        gender: Gender.MALE,
      }).value as UserProfiles;

      const longIntroduction = "a".repeat(501);
      const result = profile.updateProfile({
        introduction: longIntroduction,
      });

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain("[UserProfiles] 자기소개는 500자를 초과할 수 없습니다");
      expect(profile.introduction).toBeUndefined(); // 원래 값 유지
    });
  });

  describe("delete/restore", () => {
    it("삭제하고 복구할 수 있다", () => {
      const profile = UserProfiles.createNew({
        userId: new UniqueEntityId(faker.number.int()),
        profileImage: faker.image.avatar(),
        phoneNumber: validPhoneNumber,
        gender: Gender.MALE,
      }).value as UserProfiles;

      expect(profile.deletedAt).toBeNull();

      profile.delete();
      expect(profile.deletedAt).not.toBeNull();

      profile.restore();
      expect(profile.deletedAt).toBeNull();
    });
  });

  describe("validateDomain", () => {
    it("유효하지 않은 gender면 실패한다", () => {
      const result = UserProfiles.create(
        {
          userId: new UniqueEntityId(faker.number.int()),
          profileImage: faker.image.avatar(),
          phoneNumber: validPhoneNumber,
          gender: "INVALID_GENDER" as Gender,
          createdAt: getNowDayjs(),
          updatedAt: getNowDayjs(),
          deletedAt: null,
        },
        new UniqueEntityId(1),
      );

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain("[UserProfiles] 유효하지 않은 성별입니다");
    });
  });
});
