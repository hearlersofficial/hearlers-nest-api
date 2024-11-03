export enum RpcExceptionCode {
  OK = 0, // 요청이 성공적으로 처리됨
  CANCELLED = 1, // 요청이 취소됨
  UNKNOWN = 2, // 알 수 없는 오류
  INVALID_ARGUMENT = 3, // 잘못된 인자가 전달됨
  DEADLINE_EXCEEDED = 4, // 요청 기한 초과
  NOT_FOUND = 5, // 요청한 리소스가 없음
  ALREADY_EXISTS = 6, // 리소스가 이미 존재함
  PERMISSION_DENIED = 7, // 권한이 없음
  UNAUTHENTICATED = 16, // 인증되지 않음
  RESOURCE_EXHAUSTED = 8, // 리소스가 소진됨
  FAILED_PRECONDITION = 9, // 요청이 실패하기 위한 조건이 충족되지 않음
  ABORTED = 10, // 요청이 중단됨
  OUT_OF_RANGE = 11, // 값이 허용된 범위를 초과함
  UNIMPLEMENTED = 12, // 요청된 메서드가 구현되지 않음
  INTERNAL = 13, // 내부 오류
  UNAVAILABLE = 14, // 서비스가 사용할 수 없음
  DATA_LOSS = 15, // 데이터 손실
}
