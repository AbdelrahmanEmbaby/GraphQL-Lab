import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DriverService } from './driver.service';
import { Driver } from 'src/schemas/driver/driver.schema';
import { UpdateDriverDto } from 'src/dtos/driver/update-driver.dto';
import { CreateDriverDto } from 'src/dtos/driver/create-driver.dto';

@Resolver(() => Driver)
export class DriverResolver {
  constructor(private driverService: DriverService) {}

  @Query(() => [Driver])
  async drivers() {
    return await this.driverService.findAll();
  }

  @Query(() => Driver, { nullable: true })
  async driver(@Args('id') id: string) {
    return await this.driverService.findOne(id);
  }

  @Mutation(() => Driver)
  async createDriver(@Args('data') createDriverDto: CreateDriverDto) {
    return await this.driverService.create(createDriverDto);
  }

  @Mutation(() => Driver)
  async updateDriver(
    @Args('id') id: string,
    @Args('data') updateDriverDto: UpdateDriverDto,
  ) {
    return await this.driverService.update(id, updateDriverDto);
  }

  @Mutation(() => Driver)
  async deleteDriver(@Args('id') id: string) {
    return await this.driverService.delete(id);
  }
}
