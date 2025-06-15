import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CarResolver } from './modules/car/car.resolver';
import { DriverResolver } from './modules/driver/driver.resolver';
import { DriverModule } from './modules/driver/driver.module';
import { CarModule } from './modules/car/car.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/graphql_lab'),
    CarModule,
    DriverModule,
  ],
  controllers: [],
  providers: [CarResolver, DriverResolver],
})
export class AppModule {}
