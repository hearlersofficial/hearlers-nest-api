import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TypeOrmConfigs implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: "postgres",
      host: process.env.POSTGRESQL_HOST,
      port: parseInt(process.env.POSTGRESQL_PORT),
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      entities: [__dirname + "/../**/*.entity.{js,ts}"],
      synchronize: process.env.NODE_ENV === "development",
      retryAttempts: 3,
      logging: process.env.NODE_ENV === "development",
    };
  }
}
