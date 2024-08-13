import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class ProductIdDto {
    @ApiProperty({description: 'id of product'})
    @IsString()
    @IsMongoId()
    id: string;
  }