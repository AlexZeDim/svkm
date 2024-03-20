import { Schema } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String, required: true, index: true })
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

export const CategorySchema = SchemaFactory.createForClass(SpellReagents);
CategorySchema.index({ slug: 1 }, { name: 'GET' });
