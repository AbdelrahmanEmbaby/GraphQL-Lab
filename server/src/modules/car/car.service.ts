import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from 'src/dtos/car/create-car.dto';
import { UpdateCarDto } from 'src/dtos/car/update-car.dto';
import { Car, CarDocument } from 'src/schemas/car/car.schema';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car.name)
    private readonly carModel: Model<CarDocument>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    return await this.carModel.create(createCarDto);
  }

  async findAll(hasDriver?: boolean): Promise<Car[]> {
    if (hasDriver === undefined) {
      return this.carModel.find().exec();
    }

    if (hasDriver) {
      // Cars with a driverId assigned
      return this.carModel.find({ driverId: { $ne: null } }).exec();
    }

    // Cars with no driverId assigned
    return this.carModel.find({ driverId: null }).exec();
  }

  async findCarsByIds(ids: string[]): Promise<Car[]> {
    return this.carModel
      .find({
        _id: { $in: ids },
      })
      .exec();
  }

  async findOne(id: string): Promise<Car | null> {
    return this.carModel.findById(id).exec();
  }

  async delete(id: string): Promise<Car | null> {
    return this.carModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car | null> {
    return this.carModel
      .findByIdAndUpdate(id, updateCarDto, { new: true })
      .exec();
  }
}
