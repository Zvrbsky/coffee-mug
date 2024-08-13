import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddProductDto } from '../dto/add-product.dto';
import { mapAddProductDtoToCommand } from '../mappers/product.mapper';
import { Product, ProductView } from '../db/product.schema';
import { GetProductsQuery } from '../query/get-products.query';
import { ProductIdDto } from '../dto/product-id.dto';
import { StockDto } from '../dto/stock.dto';
import { ModifyStockCommand } from '../command/modify-stock.command';

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

  @Post(':id/restock')
  @ApiCreatedResponse({type: ProductView})
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async restockProduct(@Param() params: ProductIdDto, @Body() body: StockDto): Promise<void> {
    return await this.commandBus.execute(new ModifyStockCommand(params.id, body.amount));
  }

  @Post(':id/sell')
  @ApiCreatedResponse({type: ProductView})
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async sellProduct(@Param() params: ProductIdDto, @Body() body: StockDto): Promise<void> {
    return await this.commandBus.execute(new ModifyStockCommand(params.id, -body.amount));
  }
}
