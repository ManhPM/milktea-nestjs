import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
