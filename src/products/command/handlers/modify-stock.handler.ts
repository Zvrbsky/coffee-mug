import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "../../db/product.schema";
import { Model } from "mongoose";
import { ModifyStockCommand } from "../modify-stock.command";
import { BadRequestException, NotFoundException } from "@nestjs/common";

@CommandHandler(ModifyStockCommand)
export class ModifyStockHandler implements ICommandHandler<ModifyStockCommand> {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async execute(command: ModifyStockCommand): Promise<Product[]> {
    const productsToSave = await Promise.all(command.products.map(async ({id, amount}) => {
      const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (product.stock + amount < 0){
      throw new BadRequestException(`Product with id ${id} not available`);
    }

    product.stock += amount;
    
    return product;
    }))

    return Promise.all(productsToSave.map((product) => product.save()));
  }
}