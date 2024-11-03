import { COMMON_COLUMN } from "~/src/shared/core/constants/entities.constants";

export const USER = {
  TABLE: {
    NAME: "users",
    KAKAO: "kakao",
  },
  COLUMN: {
    NICKNAME: "nickname",
    PROFILE_IMAGE: "profile_image",
    PHONE_NUMBER: "phone_number",
    AUTH_CHANNEL: "auth_channel",
    STATUS: "status",
    ...COMMON_COLUMN.COLUMN,
  },
  PROPERTY: {
    NICKNAME: "nickname",
    PROFILE_IMAGE: "profileImage",
    PHONE_NUMBER: "phoneNumber",
    AUTH_CHANNEL: "authChannel",
    KAKAO: "kakao",
    STATUS: "status",
    ...COMMON_COLUMN.PROPERTY,
  },
};

export const KAKAO = {
  TABLE: {
    NAME: "kakao",
  },
  COLUMN: {
    UNIQUE_ID: "unique_id",
    USER_ID: "user_id",
    ...COMMON_COLUMN.COLUMN,
  },
  PROPERTY: {
    UNIQUE_ID: "uniqueID",
    USER_ID: "userID",
    USER: "user",
    ...COMMON_COLUMN.PROPERTY,
  },
  JOIN: {
    USER_ID: "user_id",
  },
};

export const NAVER = {
  TABLE: {
    NAME: "naver",
  },
  COLUMN: {
    UNIQUE_ID: "unique_id",
    USER_ID: "user_id",
    ...COMMON_COLUMN.COLUMN,
  },
  PROPERTY: {
    UNIQUE_ID: "uniqueID",
    USER_ID: "userID",
    USER: "user",
    ...COMMON_COLUMN.PROPERTY,
  },
  JOIN: {
    USER_ID: "user_id",
  },
};
