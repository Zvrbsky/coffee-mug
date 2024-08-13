import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class MakeOrderDto {
    @ApiProperty({description: 'ids of product', isArray: true, type: String})
    @IsMongoId({each: true})
    products: string[];

    @ApiProperty({description: 'id of customer', example: '66bb3a559054513a7d3dbf9a'})
    @IsMongoId()
    customerId: string
}