import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './db/product.schema';
import { AddProductHandler } from './command/handlers/add-product.handler';
import { GetProductsHandler } from './query/handlers/get-products.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [AddProductHandler, GetProductsHandler],
})
export class ProductsModule {}
