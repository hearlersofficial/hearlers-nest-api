import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ClientProvider, ClientsModuleOptionsFactory, Transport } from "@nestjs/microservices";

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

export const KAFKA_CLIENT = Symbol("KAFKA_CLIENT");

@Injectable()
export class ClientsConfigs implements ClientsModuleOptionsFactory {
  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS],
          clientId: process.env.KAFKA_CLIENT_ID,
        },
        consumer: {
          groupId: process.env.KAFKA_GROUP_ID,
        },
      },
    };
  }
}
