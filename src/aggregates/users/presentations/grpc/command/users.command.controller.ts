import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

@Controller("user")
export class GrpcUserCommandController {
  constructor(private readonly commandBus: CommandBus) {}
}
