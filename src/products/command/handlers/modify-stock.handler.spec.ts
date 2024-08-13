import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ModifyStockHandler } from './modify-stock.handler';
import { Model } from 'mongoose';
import { Product } from '../../db/product.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ModifyStockHandler', () => {
  let modifyStockHandler: ModifyStockHandler;
  let productModel = createMock<Model<Product>>();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        ModifyStockHandler,
        {
          provide: getModelToken(Product.name),
          useValue: productModel,
        }
      ],
    })
    .compile();

    modifyStockHandler = moduleRef.get<ModifyStockHandler>(ModifyStockHandler);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should throw if product not found ', async () => {
      jest.spyOn(productModel, 'findById').mockResolvedValue(undefined);
      
      await expect(modifyStockHandler.execute({products: [{id: 'a', amount: 1}]})).rejects.toThrow(NotFoundException);
      expect(productModel.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw if after operation amount will be less then 0 ', async () => {
      jest.spyOn(productModel, 'findById').mockResolvedValue({stock: 1} as any);
      
      await expect(modifyStockHandler.execute({products: [{id: 'a', amount: -2}]})).rejects.toThrow(BadRequestException);
      expect(productModel.findById).toHaveBeenCalledTimes(1);
    });

    it('should return updated product', async () => {
      const product = {
        name: 'product',
        description: 'description',
        stock: 2,
        price: 1.5,
        save: () => product,
      }


      jest.spyOn(productModel, 'findById').mockResolvedValue(product);
      
      const result = await modifyStockHandler.execute({products: [{id: 'a', amount: 1}]});

      expect(result[0].stock).toEqual(3);
      expect(productModel.findById).toHaveBeenCalledTimes(1);
    });
  })
});
