import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCarDto } from './create-car.dto';

@InputType()
export class UpdateCarDto extends PartialType(CreateCarDto) {}
