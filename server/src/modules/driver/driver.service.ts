import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Driver, DriverDocument } from 'src/schemas/driver/driver.schema';
import { Car, CarDocument } from 'src/schemas/car/car.schema';
import { CreateDriverDto } from 'src/dtos/driver/create-driver.dto';
import { UpdateDriverDto } from 'src/dtos/driver/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name)
    private readonly driverModel: Model<DriverDocument>,
    @InjectModel(Car.name)
    private readonly carModel: Model<CarDocument>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    return await this.driverModel.create(createDriverDto);
  }

  async findAll(): Promise<Driver[]> {
    return this.driverModel.find().populate('cars').exec();
  }

  async findOne(id: string): Promise<Driver | null> {
    return this.driverModel.findById(id).populate('cars').exec();
  }

  async delete(id: string): Promise<Driver | null> {
    await this.carModel.updateMany({ driver: id }, { $set: { driver: null } });

    return await this.driverModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateDriverDto: UpdateDriverDto,
  ): Promise<Driver | null> {
    return this.driverModel
      .findByIdAndUpdate(id, updateDriverDto, { new: true })
      .exec();
  }
}