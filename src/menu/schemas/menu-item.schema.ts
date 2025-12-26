import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'menu' })
export class MenuItem extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  preco: number;

  @Prop({ required: true })
  categoria: string;

  @Prop({ type: [String], default: [] })
  imagens: string[];

  @Prop({ default: Date.now })
  criadoEm: Date;

  @Prop({ default: Date.now })
  atualizadoEm: Date;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
