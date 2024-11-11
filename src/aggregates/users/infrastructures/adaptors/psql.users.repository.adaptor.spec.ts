import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { fakerKO as faker } from "@faker-js/faker";
import { Repository } from "typeorm";
import { PsqlUsersRepositoryAdaptor } from "./psql.users.repository.adaptor";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";
import { UserProgressesEntity } from "~/src/shared/core/infrastructure/entities/UserProgresses.entity";
import { UserPromptsEntity } from "~/src/shared/core/infrastructure/entities/UserPrompts.entity";
import { Users } from "~/src/aggregates/users/domain/Users";
import { AuthChannel } from "~/src/shared/enums/AuthChannel.enum";
import { Gender } from "~/src/shared/enums/Gender.enum";
import { ProgressType, ProgressStatus } from "~/src/gen/v1/model/user_pb";
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
    it("ID로 사용자와 모든 관계를 조회할 수 있다", async () => {
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
      expect(result?.userProfile).toBeDefined();
      expect(result?.userProgresses).toHaveLength(1);
      expect(result?.userPrompts).toHaveLength(1);
    });

    it("존재하지 않는 사용자를 조회하면 null을 반환한다", async () => {
      jest.spyOn(repository, "findOne").mockResolvedValue(null);
      const result = await adaptor.findOne({ userId: 999 });
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("모든 관계가 포함된 사용자를 생성할 수 있다", async () => {
      const mockUserWithRelations = createMockUserWithRelations();
      jest.spyOn(repository, "save").mockResolvedValue(mockUserWithRelations);

      const users = Users.createNew({
        nickname: mockUserWithRelations.nickname,
        authChannel: mockUserWithRelations.authChannel,
      }).value as Users;

      const result = await adaptor.create(users);

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.nickname).toBe(mockUserWithRelations.nickname);
      expect(result.authChannel).toBe(mockUserWithRelations.authChannel);
    });
  });
});
