import { DynamicModule, Global, Module } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";

@Global()
@Module({})
export class EventEmitterModule {
  static forRoot(): DynamicModule {
    return {
      module: EventEmitterModule,
      providers: [
        {
          provide: EventEmitter2,
          useValue: new EventEmitter2({
            wildcard: true,
            delimiter: ".",
            maxListeners: 10,
            verboseMemoryLeak: true,
          }),
        },
      ],
      exports: [EventEmitter2],
    };
  }
}
