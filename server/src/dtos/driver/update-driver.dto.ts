import { InputType, PartialType } from '@nestjs/graphql';
import { CreateDriverDto } from './create-driver.dto';

@InputType()
export class UpdateDriverDto extends PartialType(CreateDriverDto) {}
