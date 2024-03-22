import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ type: String })
  _id: string;

  @Prop({ type: String, unique: true, required: true, index: true })
  slug: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  createdAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ slug: 1 }, { name: 'GET' });
CategorySchema.index(
  {
    name: 'text',
    description: 'text',
  },
  {
    default_language: 'russian',
    weights: {
      name: 5,
      description: 1,
    },
    name: 'TEXT_FILTER',
  },
);
