import { create } from "@bufbuild/protobuf";
import { Timestamp, TimestampSchema } from "@bufbuild/protobuf/wkt";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export function getNowDayjs(): Dayjs {
  return dayjs();
}

export function convertDayjs(dateString: string): Dayjs {
  return dayjs(dateString);
}

export function formatDayjs(date: Dayjs): string | null {
  if (!date) return null;
  return date.format("YYYY-MM-DD HH:mm:ss");
}

export function isBetweenDayjs(target: Dayjs, from: Dayjs, to: Dayjs): boolean {
  return target.isBetween(from, to);
}

export class TimestampUtils {
  // Date -> Timestamp
  static dateToTimestamp(date: Date): Timestamp {
    const seconds = BigInt(Math.floor(date.getTime() / 1000));
    const nanos = (date.getTime() % 1000) * 1_000_000;

    return create(TimestampSchema, {
      seconds: seconds,
      nanos: nanos,
    });
  }

  // Timestamp -> Date
  static timestampToDate(timestamp: Timestamp): Date {
    const milliseconds = Number(timestamp.seconds) * 1000 + Math.floor(timestamp.nanos / 1_000_000);
    return new Date(milliseconds);
  }

  // 현재 시간을 Timestamp로
  static now(): Timestamp {
    return this.dateToTimestamp(new Date());
  }

  // ISO 문자열 -> Timestamp
  static fromISOString(isoString: string): Timestamp {
    return this.dateToTimestamp(new Date(isoString));
  }

  // Timestamp -> ISO 문자열
  static toISOString(timestamp: Timestamp): string {
    return this.timestampToDate(timestamp).toISOString();
  }

  static dayjsToTimestamp(dayjs: Dayjs | null): Timestamp | null {
    if (!dayjs) return null;
    return this.dateToTimestamp(dayjs.toDate());
  }

  static timestampToDayjs(timestamp: Timestamp | null): Dayjs | null {
    if (!timestamp) return null;
    return dayjs(this.timestampToDate(timestamp));
  }
}
