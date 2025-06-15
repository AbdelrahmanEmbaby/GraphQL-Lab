import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from 'src/schemas/car/car.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  providers: [CarService, CarResolver],
  exports: [CarService],
})
export class CarModule {}
