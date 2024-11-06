import { GrpcOptions, Transport } from "@nestjs/microservices";
import { ReflectionService } from "@grpc/reflection";
import { INestMicroservice } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { findProtoFiles } from "~/src/shared/utils/Proto.utils";

export enum ServiceType {
  USERS = "USERS",
  COUNSELINGS = "COUNSELINGS",
}

export const serviceConfigs = {
  [ServiceType.USERS]: {
    packages: ["com.hearlers.v1.model", "com.hearlers.v1.service", "com.hearlers.v1.common"],
    port: parseInt(process.env.GRPC_PORT || "50051"),
    host: process.env.GRPC_HOST || "localhost",
    protoPath: process.cwd() + process.env.PROTO_PATH || "src/proto",
  },
  [ServiceType.COUNSELINGS]: {
    packages: ["com.hearlers.v1.model", "com.hearlers.v1.service", "com.hearlers.v1.common"],
    port: parseInt(process.env.GRPC_PORT || "50052"),
    host: process.env.GRPC_HOST || "localhost",
    protoPath: process.env.PROTO_PATH || "/proto",
  },
};

export interface GrpcServiceConfig {
  protoPath: string;
  packages: string[];
  port: number;
  host: string;
}

export const createGrpcOptions = (serviceName: string, config: GrpcServiceConfig): GrpcOptions => {
  const protoFiles = findProtoFiles(config.protoPath);

  return {
    transport: Transport.GRPC,
    options: {
      package: config.packages,
      protoPath: protoFiles,
      url: `${config.host}:${config.port}`,
      loader: {
        includeDirs: [config.protoPath],
      },
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  };
};

export async function createGrpcMicroservice(
  module: any,
  serviceName: string,
  config: GrpcServiceConfig,
): Promise<INestMicroservice> {
  const app = await NestFactory.createMicroservice(module, createGrpcOptions(serviceName, config));

  return app;
}
