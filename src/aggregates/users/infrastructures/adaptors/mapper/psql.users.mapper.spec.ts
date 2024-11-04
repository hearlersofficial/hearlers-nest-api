import { fakerKO as faker } from "@faker-js/faker";
import { Users } from "~/src/aggregates/users/domain/Users";
import { UserProfiles } from "~/src/aggregates/users/domain/UserProfiles";
import { UserProgresses } from "~/src/aggregates/users/domain/UserProgresses";
import { PsqlUsersMapper } from "./psql.users.mapper";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { AuthChannel } from "~/src/shared/enums/AuthChannel.enum";
import { Gender } from "~/src/shared/enums/Gender.enum";
import { ProgressType } from "~/src/shared/enums/ProgressType.enum";
import { getNowDayjs, formatDayjs } from "~/src/shared/utils/Date.utils";
import { ProgressStatus } from "~/src/shared/enums/ProgressStatus.enum";
import { UserProgressesEntity } from "~/src/shared/core/infrastructure/entities/UserProgresses.entity";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";

describe("PsqlUsersMapper", () => {
  const createMockUserEntity = () => {
    const entity = new UsersEntity();
    entity.id = faker.number.int();
    entity.nickname = faker.internet.userName().slice(0, 10);
    entity.authChannel = AuthChannel.KAKAO;
    entity.createdAt = formatDayjs(getNowDayjs());
    entity.updatedAt = formatDayjs(getNowDayjs());
    entity.deletedAt = null;
    return entity;
  };

  describe("toDomain", () => {
    it("Entity를 Domain으로 변환할 수 있다", () => {
      const entity = createMockUserEntity();
      const domain = PsqlUsersMapper.toDomain(entity);

      expect(domain).toBeDefined();
      expect(domain?.id.equals(new UniqueEntityId(entity.id))).toBe(true);
      expect(domain?.nickname).toBe(entity.nickname);
      expect(domain?.authChannel).toBe(entity.authChannel);
    });

    it("관계가 포함된 Entity를 Domain으로 변환할 수 있다", () => {
      const entity = createMockUserEntity();

      // Profile 추가
      entity.userProfiles = {
        id: faker.number.int(),
        user: entity,
        profileImage: faker.image.avatar(),
        phoneNumber: "01012345678",
        gender: Gender.MALE,
        createdAt: formatDayjs(getNowDayjs()),
        updatedAt: formatDayjs(getNowDayjs()),
        deletedAt: null,
      } as UserProfilesEntity;

      // Progress 추가
      entity.userProgresses = [
        {
          id: faker.number.int(),
          status: ProgressStatus.IN_PROGRESS,
          user: entity,
          progressType: ProgressType.ONBOARDING,
          createdAt: formatDayjs(getNowDayjs()),
          updatedAt: formatDayjs(getNowDayjs()),
          deletedAt: null,
        } as UserProgressesEntity,
      ];

      const domain = PsqlUsersMapper.toDomain(entity);

      expect(domain).toBeDefined();
      expect(domain?.userProfile).toBeDefined();
      expect(domain?.userProgresses).toHaveLength(1);
    });

    it("null Entity를 변환하면 null을 반환한다", () => {
      const domain = PsqlUsersMapper.toDomain(null as any);
      expect(domain).toBeNull();
    });
  });

  describe("toEntity", () => {
    it("Domain을 Entity로 변환할 수 있다", () => {
      const users = Users.createNew({
        nickname: faker.internet.userName().slice(0, 10),
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const entity = PsqlUsersMapper.toEntity(users);

      expect(entity).toBeDefined();
      expect(entity.nickname).toBe(users.nickname);
      expect(entity.authChannel).toBe(users.authChannel);
    });

    it("관계가 포함된 Domain을 Entity로 변환할 수 있다", () => {
      const users = Users.createNew({
        nickname: faker.internet.userName().slice(0, 10),
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      // Profile 추가
      const profile = UserProfiles.createNew({
        userId: users.id,
        profileImage: faker.image.avatar(),
        phoneNumber: "01012345678",
        gender: Gender.MALE,
      }).value as UserProfiles;
      users.setProfile(profile);

      // Progress 추가
      const progress = UserProgresses.createNew({
        userId: users.id,
        progressType: ProgressType.ONBOARDING,
      }).value as UserProgresses;
      users.addProgress(progress);

      const entity = PsqlUsersMapper.toEntity(users);

      expect(entity).toBeDefined();
      expect(entity.userProfiles).toBeDefined();
      expect(entity.userProgresses).toHaveLength(1);
      expect(entity.userProfiles.user).toBe(entity); // 양방향 관계 확인
      expect(entity.userProgresses[0].user).toBe(entity); // 양방향 관계 확인
    });
  });
});
