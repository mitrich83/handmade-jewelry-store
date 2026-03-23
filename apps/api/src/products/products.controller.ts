import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductQueryDto } from './dto/product-query.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() productQueryDto: ProductQueryDto) {
    return this.productsService.findAll(productQueryDto)
  }

  @Get(':slug')
  findOne(@Param('slug') productSlug: string) {
    return this.productsService.findOneBySlug(productSlug)
  }

  // TODO #72: add @UseGuards(JwtAuthGuard) + @Roles('ADMIN') when auth is implemented
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  // TODO #72: add @UseGuards(JwtAuthGuard) + @Roles('ADMIN') when auth is implemented
  @Patch(':slug')
  update(@Param('slug') productSlug: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(productSlug, updateProductDto)
  }

  // TODO #72: add @UseGuards(JwtAuthGuard) + @Roles('ADMIN') when auth is implemented
  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('slug') productSlug: string) {
    return this.productsService.remove(productSlug)
  }
}
