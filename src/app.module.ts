import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { CounselsServiceModule } from "~/src/services/counselings/counsels.service.module";
import { UsersServiceModule } from "~/src/services/users/users.service.module";

@Module({
  imports: [UsersServiceModule, CounselsServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  async onModuleInit() {
    this.logger.log("App Module has been initialized");
    this.logger.log(`Environment: ${process.env.NODE_ENV}`);
    this.logger.log(`GRPC Port: ${process.env.GRPC_PORT}`);
  }
}
