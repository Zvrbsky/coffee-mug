import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "src/products/db/product.schema";
import { Model } from "mongoose";
import { GetProductsQuery } from "../get-products.query";

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async execute(query: GetProductsQuery): Promise<Product[]> {
    return this.productModel.find();
  }
}