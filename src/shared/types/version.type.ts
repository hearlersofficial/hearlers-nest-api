export type VersionString = `${number}.${number}`;

export const isValidVersion = (version: string): version is VersionString => {
  const versionRegex = /^\d{1,3}\.\d{1,3}$/; // 최대 3자리 숫자
  return versionRegex.test(version);
};
