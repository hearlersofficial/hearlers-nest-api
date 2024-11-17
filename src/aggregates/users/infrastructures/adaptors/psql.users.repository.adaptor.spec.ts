import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { fakerKO as faker } from "@faker-js/faker";
import { Repository } from "typeorm";
import { PsqlUsersRepositoryAdaptor } from "./psql.users.repository.adaptor";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";
import { UserProgressesEntity } from "~/src/shared/core/infrastructure/entities/UserProgresses.entity";
import { UserPromptsEntity } from "~/src/shared/core/infrastructure/entities/UserPrompts.entity";
import { KakaoEntity } from "~/src/shared/core/infrastructure/entities/Kakao.entity";
import { Users } from "~/src/aggregates/users/domain/Users";
import { Kakao } from "~/src/aggregates/users/domain/Kakao";
import { AuthChannel } from "~/src/gen/v1/model/user_pb";
import { Gender, Mbti } from "~/src/gen/v1/model/user_pb";
import { ProgressStatus, ProgressType } from "~/src/gen/v1/model/user_pb";
import { formatDayjs, getNowDayjs, convertDayjs } from "~/src/shared/utils/Date.utils";
import { EmotionalState } from "~/src/shared/enums/EmotionalState.enum";

describe("PsqlUsersRepositoryAdaptor", () => {
  let module: TestingModule;
  let repository: Repository<UsersEntity>;
  let adaptor: PsqlUsersRepositoryAdaptor;

  const createMockUserEntity = () => {
    const user = new UsersEntity();
    user.id = faker.number.int();
    user.nickname = faker.internet.userName().slice(0, 10);
    user.authChannel = AuthChannel.KAKAO;
    user.createdAt = formatDayjs(getNowDayjs());
    user.updatedAt = formatDayjs(getNowDayjs());
    user.deletedAt = null;
    return user;
  };

  const createMockUserWithRelations = () => {
    const user = createMockUserEntity();

    // UserProfiles 관계 설정
    const profile = new UserProfilesEntity();
    profile.id = faker.number.int();
    profile.userId = user.id;
    profile.profileImage = faker.image.avatar();
    profile.phoneNumber = "01012345678";
    profile.gender = Gender.MALE;
    profile.birthday = formatDayjs(convertDayjs("1990-01-01"));
    profile.introduction = faker.lorem.paragraph();
    profile.createdAt = formatDayjs(getNowDayjs());
    profile.updatedAt = formatDayjs(getNowDayjs());
    profile.deletedAt = null;
    user.userProfiles = profile;

    // UserProgresses 관계 설정
    const progress = new UserProgressesEntity();
    progress.id = faker.number.int();
    progress.userId = user.id;
    progress.progressType = ProgressType.ONBOARDING;
    progress.status = ProgressStatus.IN_PROGRESS;
    progress.lastUpdated = formatDayjs(getNowDayjs());
    progress.createdAt = formatDayjs(getNowDayjs());
    progress.updatedAt = formatDayjs(getNowDayjs());
    progress.deletedAt = null;
    user.userProgresses = [progress];

    // UserPrompts 관계 설정
    const prompt = new UserPromptsEntity();
    prompt.id = faker.number.int();
    prompt.templateId = faker.number.int();
    prompt.userId = user.id;
    prompt.context = {
      emotionalState: EmotionalState.ANGRY,
      recentEvents: [faker.lorem.sentence()],
    };
    prompt.generatedPrompt = faker.lorem.paragraph();
    prompt.conversationHistory = [
      {
        role: "user",
        content: faker.lorem.sentence(),
        timestamp: formatDayjs(getNowDayjs()),
      },
    ];
    prompt.analysis = {
      sentimentScore: 0.8,
      keyTopics: [faker.lorem.word()],
    };
    prompt.createdAt = formatDayjs(getNowDayjs());
    prompt.updatedAt = formatDayjs(getNowDayjs());
    prompt.deletedAt = null;
    user.userPrompts = [prompt];

    return user;
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        PsqlUsersRepositoryAdaptor,
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<UsersEntity>>(getRepositoryToken(UsersEntity));
    adaptor = module.get<PsqlUsersRepositoryAdaptor>(PsqlUsersRepositoryAdaptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findOne", () => {
    it("ID로 사용자의 기본 관계들을 조회할 수 있다", async () => {
      const mockUserWithRelations = createMockUserWithRelations();
      jest.spyOn(repository, "findOne").mockResolvedValue(mockUserWithRelations);

      const result = await adaptor.findOne({ userId: mockUserWithRelations.id });

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockUserWithRelations.id },
        relations: {
          userProfiles: true,
          userProgresses: true,
          userPrompts: true,
        },
      });

      expect(result).toBeDefined();
      expect(result?.id.getNumber()).toBe(mockUserWithRelations.id);
      expect(result?.nickname).toBe(mockUserWithRelations.nickname);
    });

    it("카카오 uniqueId로 사용자를 조회할 때 kakao relation이 추가된다", async () => {
      const mockUser = createMockUserEntity();
      const kakao = new KakaoEntity();
      kakao.id = faker.number.int();
      kakao.userId = mockUser.id;
      kakao.uniqueId = faker.string.numeric(10);
      mockUser.kakao = kakao;

      jest.spyOn(repository, "findOne").mockResolvedValue(mockUser);

      const result = await adaptor.findOne({
        authChannel: AuthChannel.KAKAO,
        uniqueId: kakao.uniqueId,
      });

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          kakao: {
            uniqueId: kakao.uniqueId,
          },
        },
        relations: {
          userProfiles: true,
          userProgresses: true,
          userPrompts: true,
          kakao: true,
        },
      });

      expect(result).toBeDefined();
      expect(result?.kakao?.uniqueId).toBe(kakao.uniqueId);
    });

    it("존재하지 않는 사용자를 조회하면 null을 반환한다", async () => {
      jest.spyOn(repository, "findOne").mockResolvedValue(null);
      const result = await adaptor.findOne({ userId: 999 });
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("카카오 계정이 연동된 사용자를 생성할 수 있다", async () => {
      const mockUser = createMockUserEntity();
      const kakao = new KakaoEntity();
      kakao.id = faker.number.int();
      kakao.userId = mockUser.id;
      kakao.uniqueId = faker.string.numeric(10);
      mockUser.kakao = kakao;
      jest.spyOn(repository, "create").mockReturnValue(mockUser);
      jest.spyOn(repository, "save").mockResolvedValue(mockUser);

      const users = Users.createNew({
        nickname: mockUser.nickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const kakaoResult = Kakao.createNew({
        userId: users.id,
        uniqueId: kakao.uniqueId,
      });
      users.setKakao(kakaoResult.value);
      const result = await adaptor.create(users);

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.kakao?.uniqueId).toBe(kakao.uniqueId);
    });
  });

  describe("update", () => {
    it("카카오 계정 정보를 설정할 수 있다", async () => {
      const mockUser = createMockUserEntity();
      const kakao = new KakaoEntity();
      kakao.id = faker.number.int();
      kakao.userId = mockUser.id;
      kakao.uniqueId = "164425";
      mockUser.kakao = kakao;

      jest.spyOn(repository, "save").mockResolvedValue(mockUser);

      const users = Users.createNew({
        nickname: mockUser.nickname,
        authChannel: AuthChannel.KAKAO,
      }).value as Users;

      const kakaoResult = Kakao.createNew({
        userId: users.id,
        uniqueId: "164425",
      });
      users.setKakao(kakaoResult.value);

      const result = await adaptor.update(users);

      expect(repository.save).toHaveBeenCalled();
      expect(result.kakao?.uniqueId).toBe("164425");
    });
  });
});
