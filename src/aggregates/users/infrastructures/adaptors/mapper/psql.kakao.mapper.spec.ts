import { fakerKO as faker } from "@faker-js/faker";
import { InternalServerErrorException } from "@nestjs/common";
import { PsqlKakaoMapper } from "./psql.kakao.mapper";
import { Kakao } from "~/src/aggregates/users/domain/Kakao";
import { KakaoEntity } from "~/src/shared/core/infrastructure/entities/Kakao.entity";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { formatDayjs, getNowDayjs, convertDayjs } from "~/src/shared/utils/Date.utils";

describe("PsqlKakaoMapper", () => {
  const createMockKakaoEntity = () => {
    const entity = new KakaoEntity();
    entity.id = faker.number.int();
    entity.userId = faker.number.int();
    entity.uniqueId = faker.string.numeric(10);
    entity.createdAt = formatDayjs(getNowDayjs());
    entity.updatedAt = formatDayjs(getNowDayjs());
    entity.deletedAt = null;
    return entity;
  };

  describe("toDomain", () => {
    it("KakaoEntity를 Kakao 도메인으로 변환할 수 있다", () => {
      const mockEntity = createMockKakaoEntity();
      const result = PsqlKakaoMapper.toDomain(mockEntity);

      expect(result).toBeDefined();
      expect(result?.id.getNumber()).toBe(mockEntity.id);
      expect(result?.userId.getNumber()).toBe(mockEntity.userId);
      expect(result?.uniqueId).toBe(mockEntity.uniqueId);
      expect(result?.createdAt.toISOString()).toBe(convertDayjs(mockEntity.createdAt).toISOString());
      expect(result?.updatedAt.toISOString()).toBe(convertDayjs(mockEntity.updatedAt).toISOString());
      expect(result?.deletedAt).toBeNull();
    });

    it("삭제된 KakaoEntity를 변환할 수 있다", () => {
      const mockEntity = createMockKakaoEntity();
      mockEntity.deletedAt = formatDayjs(getNowDayjs());

      const result = PsqlKakaoMapper.toDomain(mockEntity);

      expect(result).toBeDefined();
      expect(result?.deletedAt?.toISOString()).toBe(convertDayjs(mockEntity.deletedAt).toISOString());
    });

    it("entity가 null이면 null을 반환한다", () => {
      const result = PsqlKakaoMapper.toDomain(null);
      expect(result).toBeNull();
    });

    it("유효하지 않은 데이터로 변환을 시도하면 예외가 발생한다", () => {
      const invalidEntity = createMockKakaoEntity();
      invalidEntity.uniqueId = ""; // 유효하지 않은 데이터

      expect(() => PsqlKakaoMapper.toDomain(invalidEntity)).toThrow(InternalServerErrorException);
    });
  });

  describe("toEntity", () => {
    it("Kakao 도메인을 KakaoEntity로 변환할 수 있다", () => {
      const userId = new UniqueEntityId();
      const uniqueId = faker.string.numeric(10);

      const kakao = Kakao.createNew({
        userId,
        uniqueId,
      }).value as Kakao;

      const result = PsqlKakaoMapper.toEntity(kakao);

      expect(result).toBeDefined();
      expect(result.userId).toBe(userId.getNumber());
      expect(result.uniqueId).toBe(uniqueId);
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
      expect(result.deletedAt).toBeNull();
    });

    it("기존 ID가 있는 도메인을 변환할 수 있다", () => {
      const mockEntity = createMockKakaoEntity();
      const domain = PsqlKakaoMapper.toDomain(mockEntity);
      const result = PsqlKakaoMapper.toEntity(domain);

      expect(result.id).toBe(mockEntity.id);
    });

    it("삭제된 도메인을 변환할 수 있다", () => {
      const userId = new UniqueEntityId();
      const uniqueId = faker.string.numeric(10);

      const kakao = Kakao.createNew({
        userId,
        uniqueId,
      }).value as Kakao;

      kakao.delete();
      const result = PsqlKakaoMapper.toEntity(kakao);

      expect(result.deletedAt).toBeDefined();
    });
  });

  describe("양방향 변환", () => {
    it("Entity -> Domain -> Entity 변환이 일관성있게 동작한다", () => {
      const originalEntity = createMockKakaoEntity();
      const domain = PsqlKakaoMapper.toDomain(originalEntity);
      const resultEntity = PsqlKakaoMapper.toEntity(domain);

      expect(resultEntity.id).toBe(originalEntity.id);
      expect(resultEntity.userId).toBe(originalEntity.userId);
      expect(resultEntity.uniqueId).toBe(originalEntity.uniqueId);
      expect(resultEntity.createdAt).toBe(originalEntity.createdAt);
      expect(resultEntity.updatedAt).toBe(originalEntity.updatedAt);
      expect(resultEntity.deletedAt).toBe(originalEntity.deletedAt);
    });

    it("Domain -> Entity -> Domain 변환이 일관성있게 동작한다", () => {
      const originalDomain = Kakao.createNew({
        userId: new UniqueEntityId(),
        uniqueId: faker.string.numeric(10),
      }).value as Kakao;

      const entity = PsqlKakaoMapper.toEntity(originalDomain);
      const resultDomain = PsqlKakaoMapper.toDomain(entity);

      expect(resultDomain.userId.equals(originalDomain.userId)).toBeTruthy();
      expect(resultDomain.uniqueId).toBe(originalDomain.uniqueId);
      expect(resultDomain.createdAt.format("YYYY-MM-DD HH:mm:ss")).toBe(
        originalDomain.createdAt.format("YYYY-MM-DD HH:mm:ss"),
      );
      expect(resultDomain.updatedAt.format("YYYY-MM-DD HH:mm:ss")).toBe(
        originalDomain.updatedAt.format("YYYY-MM-DD HH:mm:ss"),
      );
      expect(resultDomain.deletedAt).toBe(originalDomain.deletedAt);
    });
  });
});
