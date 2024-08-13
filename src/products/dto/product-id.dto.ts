import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class ProductIdDto {
    @ApiProperty({description: 'id of product'})
    @IsMongoId()
    id: string;
}