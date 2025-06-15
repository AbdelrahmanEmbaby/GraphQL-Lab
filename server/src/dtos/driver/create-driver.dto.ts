import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class CreateDriverDto {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => [ID])
  cars: string[];
}
