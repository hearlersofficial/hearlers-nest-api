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

export function dayjsToProtobufTimestamp(dayjsObj: dayjs.Dayjs): Timestamp {
  const timestamp = create(TimestampSchema, {
    seconds: BigInt(Math.floor(dayjsObj.valueOf() / 1000)),
    nanos: (dayjsObj.valueOf() % 1000) * 1e6,
  });
  return timestamp;
}

export function protobufTimestampToDayjs(timestamp: Timestamp): dayjs.Dayjs {
  const seconds = timestamp.seconds; // BigInt로 초 가져오기
  const nanos = timestamp.nanos; // 나노초 가져오기

  // 초를 밀리초로 변환
  const milliseconds = Number(seconds) * 1000 + Math.floor(nanos / 1e6); // 나노초를 밀리초로 변환하여 더하기

  return dayjs(milliseconds); // 밀리초로 Day.js 객체 생성
}
