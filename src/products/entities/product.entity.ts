import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { ProductImage } from './product-image.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '3e40a15a-1be9-48e2-8f6d-ec2ec1b65e44',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Nest-T',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column({
    unique: true,
    type: 'text',
  })
  title: string;

  @ApiProperty({
    example: 1.99,
    description: 'Product Price',
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: 'Nisi fugiat sunt sint quis enim',
    description: 'Product Description',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'nest-t',
    description: 'Product Slug',
    uniqueItems: true,
  })
  @Column({
    unique: true,
    type: 'text',
  })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock',
  })
  @Column({
    default: 0,
    type: 'int',
  })
  stock: string;

  @ApiProperty({
    example: ['xl', 'xxl'],
    description: 'Product Sizes',
  })
  @Column({
    array: true,
    type: 'text',
  })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product Gender',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['cool', 'new'],
    description: 'Product Tags',
  })
  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty({
    example: ['https://images1.jpg', 'https://images2.jpg'],
    description: 'Product Images',
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slugFormmater();
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slugFormmater();
  }

  slugFormmater() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
