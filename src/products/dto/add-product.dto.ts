import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class AddProductDto {

  @ApiProperty({description: 'Name of product'})
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({description: 'Description of product'})
  @IsString()
  @MaxLength(50)
  description: string;

  @ApiProperty({description: 'Price of product'})
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({description: 'No of available products'})
  @IsNumber()
  @IsInt()
  @IsPositive()
  stock: number;
}