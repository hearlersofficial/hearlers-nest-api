import { EmotionalState } from "~/src/shared/enums/EmotionalState.enum";
import { Dayjs } from "dayjs";
import { convertDayjs, formatDayjs } from "~/src/shared/utils/Date.utils";

// 도메인용 타입
export interface DomainConversation {
  role: "user" | "assistant";
  content: string;
  timestamp: Dayjs;
}

// DB Entity용 타입
export interface EntityConversation {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Context {
  emotionalState: EmotionalState;
  recentEvents?: string[];
  triggers?: string[];
  preferences?: Record<string, any>;
}

export interface Analysis {
  sentimentScore?: number;
  keyTopics?: string[];
  recommendations?: string[];
  riskFactors?: string[];
}

// 필요한 경우 타입 변환 유틸리티
export const toDomainConversation = (conv: EntityConversation): DomainConversation => ({
  ...conv,
  timestamp: convertDayjs(conv.timestamp),
});

export const toEntityConversation = (conv: DomainConversation): EntityConversation => ({
  ...conv,
  timestamp: formatDayjs(conv.timestamp),
});
