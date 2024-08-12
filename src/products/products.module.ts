import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
