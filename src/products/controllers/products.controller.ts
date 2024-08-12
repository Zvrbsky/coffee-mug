import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AddProductDto } from '../dto/add-product.dto';
import { AddProductCommand } from '../command/add-product.command';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private commandBus: CommandBus) {}

  @Get()
  getProducts(): string {
    return ''
  }

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  addProduct(@Body() addProductDto: AddProductDto): string {
    this.commandBus.execute(addProductDto);
    return ''
  }
}
