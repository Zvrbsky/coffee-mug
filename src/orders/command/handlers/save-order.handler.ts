import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SaveOrderCommand } from "../save-order.command";
import { Order } from "src/orders/db/order.schema";

@CommandHandler(SaveOrderCommand)
export class SaveOrderHandler implements ICommandHandler<SaveOrderCommand> {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async execute(command: SaveOrderCommand): Promise<Order> {
    const createdOrder = new this.orderModel(command);

    return await createdOrder.save();
  }
}