import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "../../db/product.schema";
import { Model } from "mongoose";
import { ModifyStockCommand } from "../modify-stock.command";
import { BadRequestException, NotFoundException } from "@nestjs/common";

@CommandHandler(ModifyStockCommand)
export class ModifyStockHandler implements ICommandHandler<ModifyStockCommand> {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async execute(command: ModifyStockCommand): Promise<Product> {
    const product = await this.productModel.findById(command.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock + command.amount < 0){
      throw new BadRequestException('Product not available');
    }

    product.stock += command.amount;

    return await product.save();
  }
}