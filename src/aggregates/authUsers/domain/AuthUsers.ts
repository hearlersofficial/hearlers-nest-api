import { Dayjs } from "dayjs";
import { AggregateRoot } from "~/src/shared/core/domain/AggregateRoot";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { Result } from "~/src/shared/core/domain/Result";
import { CoreStatus } from "~/src/shared/core/constants/status.constants";
import { getNowDayjs } from "~/src/shared/utils/Date.utils";
import { AuthChannel } from "~/src/gen/v1/model/user_pb";
import { Kakao } from "~/src/aggregates/authUsers/domain/Kakao";
import { RefreshTokensVO } from "~/src/aggregates/authUsers/domain/RefreshTokens.vo";

const REFRESH_TOKEN_NOT_FOUND = "리프레시 토큰을 찾을 수 없습니다.";
const REFRESH_TOKEN_EXPIRED = "리프레시 토큰이 만료되었습니다.";

export interface AuthUsersNewProps {
  authChannel: AuthChannel;
}

export interface AuthUsersProps extends AuthUsersNewProps {
  status: CoreStatus;
  userId: number;
  lastLoginAt: Dayjs | null;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  kakao?: Kakao;
  refreshTokens: RefreshTokensVO[];
}

export class AuthUsers extends AggregateRoot<AuthUsersProps> {
  private constructor(props: AuthUsersProps, id: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: AuthUsersProps, id: UniqueEntityId): Result<AuthUsers> {
    const authUsers = new AuthUsers(props, id);
    const validationResult = authUsers.validateDomain();
    authUsers.expireRefreshTokens();
    if (validationResult.isFailure) {
      return Result.fail<AuthUsers>(validationResult.error);
    }

    return Result.ok<AuthUsers>(authUsers);
  }

  public static createNew(props: AuthUsersNewProps): Result<AuthUsers> {
    const nowDayjs = getNowDayjs();

    return this.create(
      {
        ...props,
        userId: null,
        status: CoreStatus.INACTIVE,
        lastLoginAt: nowDayjs,
        createdAt: nowDayjs,
        updatedAt: nowDayjs,
        refreshTokens: [],
      },
      new UniqueEntityId(),
    );
  }

  validateDomain(): Result<void> {
    if (!this.props.authChannel) {
      return Result.fail<void>("인증 채널은 필수입니다.");
    }
    return Result.ok<void>();
  }

  // Getters
  get userId(): number {
    return this.props.userId;
  }

  get authChannel(): AuthChannel {
    return this.props.authChannel;
  }

  get kakao(): Kakao | undefined {
    return this.props.kakao;
  }

  get refreshTokens(): RefreshTokensVO[] {
    return this.props.refreshTokens;
  }

  get lastLoginAt(): Dayjs | null {
    return this.props.lastLoginAt;
  }

  get status(): CoreStatus {
    return this.props.status;
  }

  get createdAt(): Dayjs {
    return this.props.createdAt;
  }

  get updatedAt(): Dayjs {
    return this.props.updatedAt;
  }

  // Methods

  public setKakao(kakao: Kakao): Result<void> {
    if (!kakao.authUserId.equals(this.id)) {
      return Result.fail<void>("[Users] Kakao 계정의 사용자 ID가 일치하지 않습니다");
    }
    if (this.props.authChannel !== AuthChannel.KAKAO) {
      return Result.fail<void>("[Users] 인증 채널이 Kakao가 아닙니다");
    }
    this.props.kakao = kakao;
    this.props.updatedAt = getNowDayjs();
    return Result.ok<void>();
  }

  public signUp(userId: number): void {
    this.props.userId = userId;
    this.props.status = CoreStatus.ACTIVE;
    this.props.updatedAt = getNowDayjs();
  }

  public inactive(): Result<void> {
    this.props.status = CoreStatus.INACTIVE;
    this.props.updatedAt = getNowDayjs();
    return Result.ok<void>();
  }

  public updateLastLoginAt(): void {
    this.props.lastLoginAt = getNowDayjs();
    this.props.updatedAt = getNowDayjs();
  }

  public findRefreshToken(refreshToken: string): Result<RefreshTokensVO> {
    const refreshTokenVO = this.props.refreshTokens.find((token) => token.token === refreshToken);
    if (!refreshTokenVO) {
      return Result.fail<RefreshTokensVO>(REFRESH_TOKEN_NOT_FOUND);
    }
    return Result.ok<RefreshTokensVO>(refreshTokenVO);
  }

  public initializeRefreshTokens(toAddRefreshTokenVO: RefreshTokensVO): Result<RefreshTokensVO> {
    this.addRefreshToken(toAddRefreshTokenVO);
    this.expireRefreshTokens();
    this.updateLastLoginAt();
    return Result.ok<RefreshTokensVO>(toAddRefreshTokenVO);
  }

  public rotateRefreshToken(
    originalRefreshTokenVO: RefreshTokensVO,
    toAddRefreshTokenVO: RefreshTokensVO,
  ): Result<RefreshTokensVO> {
    if (originalRefreshTokenVO.isExpired()) {
      return Result.fail<RefreshTokensVO>(REFRESH_TOKEN_EXPIRED);
    }
    this.removeRefreshToken(originalRefreshTokenVO);
    this.addRefreshToken(toAddRefreshTokenVO);
    this.updateLastLoginAt();
    return Result.ok<RefreshTokensVO>(toAddRefreshTokenVO);
  }

  private addRefreshToken(refreshTokenVO: RefreshTokensVO): void {
    this.props.refreshTokens.push(refreshTokenVO);
    this.updateLastLoginAt();
  }

  private removeRefreshToken(refreshTokenVO: RefreshTokensVO): void {
    this.props.refreshTokens = this.props.refreshTokens.filter((token) => token.token !== refreshTokenVO.token);
    this.updateLastLoginAt();
  }

  private expireRefreshTokens(): void {
    this.props.refreshTokens = this.props.refreshTokens.filter((token) => !token.isExpired());
    this.updateLastLoginAt();
  }
}
