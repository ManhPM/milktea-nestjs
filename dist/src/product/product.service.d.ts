import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    readonly productRepository: Repository<Product>;
    constructor(productRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): string;
    findAll(): Promise<any>;
    checkExist(id: number): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
