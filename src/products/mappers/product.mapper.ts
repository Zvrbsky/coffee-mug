import { AddProductCommand } from "../command/add-product.command";
import { AddProductDto } from "../dto/add-product.dto";

export const mapAddProductDtoToCommand = (addProductDto: AddProductDto): AddProductCommand => {
    return new AddProductCommand(addProductDto.name, addProductDto.description, addProductDto.price, addProductDto.stock);
}