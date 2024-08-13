import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class AddProductDto {

  @ApiProperty({description: 'Name of product'})
  @IsString()
  @MaxLength(50)
  public name: string;

  @ApiProperty({description: 'Description of product'})
  @IsString()
  @MaxLength(50)
  public description: string;

  @ApiProperty({description: 'Price of product'})
  @IsNumber()
  @IsPositive()
  public price: number;

  @ApiProperty({description: 'No of available products'})
  @IsNumber()
  @IsInt()
  @IsPositive()
  public stock: number;
}