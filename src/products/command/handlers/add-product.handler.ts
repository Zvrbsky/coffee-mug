import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddProductCommand } from "../add-product.command";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "src/products/db/product.schema";
import { Model } from "mongoose";

@CommandHandler(AddProductCommand)
export class AddProductHandler implements ICommandHandler<AddProductCommand> {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async execute(command: AddProductCommand): Promise<Product> {
    const createdProduct = new this.productModel(command);

    console.log(createdProduct);

    return await createdProduct.save();
  }
}