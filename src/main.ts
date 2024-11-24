import * as dotenv from "dotenv";
import { CounselingsServiceModule } from "~/src/services/counselings/counselings.service.module";
import { UsersServiceModule } from "~/src/services/users/users.service.module";
dotenv.config({ path: [".env", ".env.dev"] });

import { createMicroservices, serviceConfigs, ServiceType } from "~/src/shared/core/presentations/Config";

const moduleMap = {
  [ServiceType.USERS]: UsersServiceModule,
  [ServiceType.COUNSELINGS]: CounselingsServiceModule,
};

async function bootstrap(): Promise<void> {
  const serviceType = process.env.SERVICE_TYPE as ServiceType;

  if (!serviceType || !(serviceType in ServiceType)) {
    throw new Error(`Invalid SERVICE_TYPE. Must be one of: ${Object.values(ServiceType).join(", ")}`);
  }

  const config = serviceConfigs[serviceType];
  const module = moduleMap[serviceType];

  const app = await createMicroservices(module, serviceType, config);
  await app.init();
  await app.startAllMicroservices();
}

bootstrap();
