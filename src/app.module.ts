import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { TestSuiteController } from './testsuite/testsuite.controller';
import { TestSuiteService } from './testsuite/testsuite.service';
import { TestSuite } from './entities/testsuite.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'qaei887.rafapenya.com',
      port: 3306,
      username: 'qaei887',
      password: 'JRK441e22',
      database: 'qaei887',
      entities: [User, TestSuite],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, TestSuite]),
    AuthModule,
  ],
  controllers: [UserController, TestSuiteController],
  providers: [UserService, TestSuiteService],
})
export class AppModule {}
