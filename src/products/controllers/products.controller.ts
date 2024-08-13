import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddProductDto } from '../dto/add-product.dto';
import { mapAddProductDtoToCommand } from '../mappers/product.mapper';
import { Product, ProductView } from '../db/product.schema';
import { GetProductsQuery } from '../query/get-products.query';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: ProductView, isArray: true})
  async getProducts(): Promise<Product[]> {
    return await this.queryBus.execute(new GetProductsQuery());
  }

  @Post()
  @ApiCreatedResponse({type: ProductView})
  @ApiBadRequestResponse()
  async addProduct(@Body() addProductDto: AddProductDto): Promise<Product> {
    return await this.commandBus.execute(mapAddProductDtoToCommand(addProductDto));
  }
}
