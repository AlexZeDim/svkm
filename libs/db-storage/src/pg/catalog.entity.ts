import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('ix__catalog__slug', ['slug'], {})
@Entity({ name: 'catalog' })
export class CatalogEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

  @Column({
    // TODO default value function,
    nullable: false,
    type: 'varchar',
  })
  id: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  slug!: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  name!: string;

  @Column({
    nullable: true,
    type: 'text',
    name: 'description',
  })
  description?: string;

  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;
}
