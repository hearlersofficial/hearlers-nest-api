import { Catch, ArgumentsHost, Logger, HttpStatus } from "@nestjs/common";
import { BaseRpcExceptionFilter, RpcException } from "@nestjs/microservices";
import { CustomRpcException, HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

@Catch()
export class AllExceptionFilter extends BaseRpcExceptionFilter<RpcException> {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof CustomRpcException) {
      const errorProto = exception.getErrorProto();
      this.logger.error(
        `status: ${errorProto.status} | code: ${errorProto.code} | ${errorProto.details}
${exception.stack}`,
      );
    } else if (exception instanceof RpcException) {
      this.logger.error(`${exception.stack}`);
    } else {
      this.logger.error(`${exception.stack}`);

      return super.catch(
        new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, "코드 베이스 내 잘못된 예외 발생"),
        host,
      );
    }

    return super.catch(exception, host);
  }
}
