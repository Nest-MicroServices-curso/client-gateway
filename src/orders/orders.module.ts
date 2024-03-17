import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE, envs } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      { name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.orders_microservice_host,
          port: envs.orders_microservice_port,
        }
      },
    ]),
  ]
})
export class OrdersModule {}
