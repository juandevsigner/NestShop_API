import { ApiProperty } from '@nestjs/swagger/dist';
import {
  IsString,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product Title',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: any;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];

  @ApiProperty()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;
}
