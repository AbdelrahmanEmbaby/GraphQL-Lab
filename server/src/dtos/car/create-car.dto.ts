import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCarDto {
  @Field()
  name: string;

  @Field()
  model: string;

  @Field({ nullable: true })
  driverId?: string;
}
