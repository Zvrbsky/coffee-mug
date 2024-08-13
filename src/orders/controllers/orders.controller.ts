import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order, OrderView } from '../db/order.schema';
import { MakeOrderDto } from '../dto/make-order.dto';
import { ModifyStockCommand } from 'src/products/command/modify-stock.command';
import { SaveOrderCommand } from '../command/save-order.command';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private commandBus: CommandBus,
  ) {}

  @Post()
  @ApiCreatedResponse({type: OrderView})
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async makeOrder(@Body() makeOrderDto: MakeOrderDto): Promise<Order> {
    await this.commandBus.execute(new ModifyStockCommand(
      makeOrderDto.products.map((id) => ({id, amount: -1}))
    ))
    return this.commandBus.execute(new SaveOrderCommand(makeOrderDto.products, makeOrderDto.customerId));
  }
}
