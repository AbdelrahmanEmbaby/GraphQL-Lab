import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type CarDocument = HydratedDocument<Car>;

@ObjectType()
@Schema()
export class Car {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  model: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Driver' })
  driverId?: Types.ObjectId;
}

export const CarSchema = SchemaFactory.createForClass(Car);
