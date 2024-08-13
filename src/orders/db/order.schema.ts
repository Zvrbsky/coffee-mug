import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/db/product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
@Expose()
export class Order {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  @ApiProperty()
  products: Product[];

  @Prop()
  @ApiProperty({type: String})
  customerId: mongoose.Schema.Types.ObjectId
}

@Expose()
export class OrderView extends Order {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  __v: number
}

export const OrderSchema = SchemaFactory.createForClass(Order);