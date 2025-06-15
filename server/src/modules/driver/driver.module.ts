import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from 'src/schemas/driver/driver.schema';
import { Car, CarSchema } from 'src/schemas/car/car.schema';
import { DriverService } from './driver.service';
import { DriverResolver } from './driver.resolver';
import { CarModule } from '../car/car.module'; // Add this import

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Driver.name, schema: DriverSchema },
      { name: Car.name, schema: CarSchema },
    ]),
    CarModule,
  ],
  providers: [DriverService, DriverResolver],
  exports: [DriverService],
})
export class DriverModule {}
