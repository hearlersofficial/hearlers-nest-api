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
import { getNowDayjs, formatDayjs, convertDayjs } from "~/src/shared/utils/Date.utils";
import { ProgressStatus } from "~/src/shared/enums/ProgressStatus.enum";
import { UserProgressesEntity } from "~/src/shared/core/infrastructure/entities/UserProgresses.entity";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";
import { Kakao } from "~/src/aggregates/users/domain/Kakao";
import { KakaoEntity } from "~/src/shared/core/infrastructure/entities/Kakao.entity";

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
        userId: entity.id,
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
          userId: entity.id,
          progressType: ProgressType.ONBOARDING,
          createdAt: formatDayjs(getNowDayjs()),
          updatedAt: formatDayjs(getNowDayjs()),
          deletedAt: null,
        } as UserProgressesEntity,
      ];

      // Kakao 추가
      entity.kakao = {
        id: faker.number.int(),
        userId: entity.id,
        uniqueId: "164425",
      } as KakaoEntity;

      const domain = PsqlUsersMapper.toDomain(entity);

      expect(domain).toBeDefined();
      expect(domain?.userProfile).toBeDefined();
      expect(domain?.userProgresses).toHaveLength(1);
      expect(domain?.kakao).toBeDefined();
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
      }).value;

      // Profile 추가
      const profile = UserProfiles.createNew({
        userId: users.id,
        profileImage: faker.image.avatar(),
        phoneNumber: "01012345678",
        gender: Gender.MALE,
        birthday: convertDayjs("1990-01-01"),
        introduction: faker.lorem.paragraph(),
      }).value;
      users.setProfile(profile);

      // Progress 추가
      const progress = UserProgresses.createNew({
        userId: users.id,
        progressType: ProgressType.ONBOARDING,
        status: ProgressStatus.NOT_STARTED,
      }).value;
      users.addProgress(progress);

      // Kakao 추가
      const kakao = Kakao.createNew({
        userId: users.id,
        uniqueId: "164425",
      }).value;
      users.setKakao(kakao);

      const entity = PsqlUsersMapper.toEntity(users);

      expect(entity).toBeDefined();
      expect(entity.userProfiles).toBeDefined();
      expect(entity.userProgresses).toHaveLength(1);
      expect(entity.kakao).toBeDefined();
      expect(entity.userProfiles.user).toBe(entity); // 양방향 관계 확인
      expect(entity.userProgresses[0].user).toBe(entity); // 양방향 관계 확인
    });
  });
});
