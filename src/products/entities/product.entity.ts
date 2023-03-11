import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'text',
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    unique: true,
    type: 'text',
  })
  slug: string;

  @Column({
    default: 0,
    type: 'int',
  })
  stock: string;

  @Column({
    array: true,
    type: 'text',
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
