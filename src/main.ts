import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { AppModule } from "~/src/app.module";
import { findProtoFiles } from "~/src/shared/utils/Proto.utils";
import { ReflectionService } from "@grpc/reflection";
import { INestMicroservice } from "@nestjs/common";
import { AllExceptionFilter } from "~/src/shared/filters/GrpcExceptionFilter";

async function bootstrap(): Promise<void> {
  const protoFiles = findProtoFiles(join(__dirname, "./proto"));
  const grpcApp: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ["com.hearlers.v1.model", "com.hearlers.v1.service", "com.hearlers.v1.common"],
      protoPath: protoFiles,
      url: "localhost:50051",
      loader: {
        includeDirs: [join(__dirname, "proto")],
      },
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await grpcApp.useGlobalFilters(new AllExceptionFilter());
  await grpcApp.listen();
}

bootstrap();
