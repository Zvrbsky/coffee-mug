import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsPositive } from "class-validator";

export class StockDto {
    @ApiProperty({description: 'No of products to restock/sell'})
    @IsNumber()
    @IsInt()
    @IsPositive()
    amount: number;
  }