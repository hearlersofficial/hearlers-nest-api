import { readdirSync, existsSync } from "fs";
import { join } from "path";

export const findProtoFiles = (dir: string): string[] => {
  let files: string[] = [];

  // 디렉토리 내의 모든 파일과 폴더를 읽습니다.
  const items = readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const res = join(dir, item.name); // 현재 아이템의 전체 경로를 생성

    // 파일일 경우 .proto 파일인지 체크
    if (item.isDirectory()) {
      // 재귀적으로 호출하여 하위 디렉토리 탐색
      files = files.concat(findProtoFiles(res));
    } else if (item.isFile() && item.name.endsWith(".proto")) {
      if (existsSync(res)) {
        // 경로가 존재하는지 확인
        files.push(res); // .proto 파일 추가
      } else {
        console.warn(`Warning: ${res} does not exist`); // 파일이 존재하지 않을 경우 경고
      }
    }
  }

  return files;
};
