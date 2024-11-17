import { fakerKO as faker } from "@faker-js/faker";
import { UserProfiles } from "~/src/aggregates/users/domain/UserProfiles";
import { PsqlUserProfilesMapper } from "./psql.userProfiles.mapper";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { Gender, Mbti } from "~/src/gen/v1/model/user_pb";
import { getNowDayjs, formatDayjs, convertDayjs } from "~/src/shared/utils/Date.utils";
import { InternalServerErrorException } from "@nestjs/common";

describe("PsqlUserProfilesMapper", () => {
  const createMockUserProfilesEntity = () => {
    const entity = new UserProfilesEntity();
    entity.id = faker.number.int();
    entity.userId = faker.number.int();
    entity.profileImage = faker.image.avatar();
    entity.phoneNumber = "01012345678";
    entity.gender = Gender.MALE;
    entity.mbti = Mbti.ENFP;
    entity.birthday = formatDayjs(convertDayjs("1990-01-01"));
    entity.introduction = faker.lorem.paragraph();
    entity.createdAt = formatDayjs(getNowDayjs());
    entity.updatedAt = formatDayjs(getNowDayjs());
    entity.deletedAt = null;

    return entity;
  };

  describe("toDomain", () => {
    it("Entity를 Domain으로 변환할 수 있다", () => {
      const entity = createMockUserProfilesEntity();
      const domain = PsqlUserProfilesMapper.toDomain(entity);
      expect(domain).toBeDefined();
      expect(domain?.id.equals(new UniqueEntityId(entity.id))).toBe(true);
      expect(domain?.userId.equals(new UniqueEntityId(entity.userId))).toBe(true);
      expect(domain?.profileImage).toBe(entity.profileImage);
      expect(domain?.phoneNumber).toBe(entity.phoneNumber);
      expect(domain?.gender).toBe(entity.gender);
      expect(domain?.mbti).toBe(entity.mbti);
      expect(domain?.birthday).toEqual(convertDayjs(entity.birthday));
      expect(domain?.introduction).toBe(entity.introduction);
    });

    it("null Entity를 변환하면 null을 반환한다", () => {
      const domain = PsqlUserProfilesMapper.toDomain(null as any);
      expect(domain).toBeNull();
    });

    it("유효하지 않은 전화번호로 변환을 시도하면 에러를 던진다", () => {
      const entity = createMockUserProfilesEntity();
      entity.phoneNumber = "invalid-phone";

      expect(() => PsqlUserProfilesMapper.toDomain(entity)).toThrow(InternalServerErrorException);
    });
  });

  describe("toEntity", () => {
    it("Domain을 Entity로 변환할 수 있다", () => {
      const userProfiles = UserProfiles.createNew({
        userId: new UniqueEntityId(faker.number.int()),
        profileImage: faker.image.avatar(),
        phoneNumber: "01012345678",
        gender: Gender.MALE,
        mbti: Mbti.ENFP,
        birthday: convertDayjs("1990-01-01"),
        introduction: faker.lorem.paragraph(),
      }).value as UserProfiles;

      const entity = PsqlUserProfilesMapper.toEntity(userProfiles);

      expect(entity).toBeDefined();
      expect(entity.profileImage).toBe(userProfiles.profileImage);
      expect(entity.phoneNumber).toBe(userProfiles.phoneNumber);
      expect(entity.gender).toBe(userProfiles.gender);
      expect(entity.mbti).toBe(userProfiles.mbti);
      expect(entity.birthday).toEqual(formatDayjs(userProfiles.birthday));
      expect(entity.introduction).toBe(userProfiles.introduction);
    });
  });
});
