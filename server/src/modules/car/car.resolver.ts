import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from 'src/schemas/car/car.schema';
import { UpdateCarDto } from 'src/dtos/car/update-car.dto';
import { CreateCarDto } from 'src/dtos/car/create-car.dto';

@Resolver(() => Car)
export class CarResolver {
  constructor(private carService: CarService) {}

  @Query(() => [Car])
  async cars(@Args('hasDriver', { nullable: true }) hasDriver?: boolean) {
    return await this.carService.findAll(hasDriver);
  }

  @Query(() => Car, { nullable: true })
  async car(@Args('id') id: string) {
    return await this.carService.findOne(id);
  }

  @Mutation(() => Car, { nullable: true })
  async deleteCar(@Args('id') id: string) {
    return await this.carService.delete(id);
  }

  @Mutation(() => Car, { nullable: true })
  async updateCar(
    @Args('id') id: string,
    @Args('data') updateCarDto: UpdateCarDto,
  ) {
    return await this.carService.update(id, updateCarDto);
  }

  @Mutation(() => Car)
  async createCar(@Args('data') createCarDto: CreateCarDto) {
    return await this.carService.create(createCarDto);
  }
}
