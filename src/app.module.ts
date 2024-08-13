import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_HOST, {
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD
      }
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
