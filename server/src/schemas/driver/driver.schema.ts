import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Car } from '../car/car.schema';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

export type DriverDocument = HydratedDocument<Driver>;

@ObjectType()
@Schema()
export class Driver {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Int)
  @Prop({
    required: true,
    type: Number,
    min: 18,
    max: 60,
  })
  age: number;

  @Field(() => [Car], { nullable: 'itemsAndList' })
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
      },
    ],
  })
  cars: Car[];
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
