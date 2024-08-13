import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
@Expose()
export class Product {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()

  description: string;

  @Prop()
  @ApiProperty()
  price: number;

  @Prop()
  @ApiProperty()
  stock: number;
}

@Expose()
export class ProductView extends Product {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  __v: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);