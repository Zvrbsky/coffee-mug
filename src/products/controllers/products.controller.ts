import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AddProductDto } from '../dto/add-product.dto';
import { mapAddProductDtoToCommand } from '../mappers/product.mapper';
import { Product, ProductView } from '../db/product.schema';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private commandBus: CommandBus) {}

  @Get()
  getProducts(): string {
    return ''
  }

  @Post()
  @ApiCreatedResponse({type: ProductView})
  @ApiBadRequestResponse()
  async addProduct(@Body() addProductDto: AddProductDto): Promise<Product> {
    return await this.commandBus.execute(mapAddProductDtoToCommand(addProductDto));
  }
}
