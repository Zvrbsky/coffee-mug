import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './db/order.schema';
import { OrdersController } from './controllers/orders.controller';
import { SaveOrderHandler } from './command/handlers/save-order.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [SaveOrderHandler],
})
export class OrdersModule {}
