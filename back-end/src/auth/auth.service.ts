import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicUser } from './auth.entity';
import { randomUUID } from 'crypto';
import { getPublicUser, getUsers } from 'src/db/db';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private now = () => Math.floor(Date.now() / 1000);
  private users = getUsers();

  signup(dto: CreateUserDto): PublicUser {
    const existing = this.users.find(
      (user) => user.email === dto.email && user.password === dto.password,
    );

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const newUser = {
      id: randomUUID(),
      name: dto.name,
      email: dto.email,
      password: dto.password,
      version: 1,
      createdAt: this.now(),
      updatedAt: null,
    };

    this.users.push(newUser);
    return getPublicUser(newUser);
  }

  login(dto: SignupDto): PublicUser {
    const user = this.users.find(
      (user) => user.email === dto.email && user.password === dto.password,
    );

    if (!user) {
      throw new Error('User not found');
    }

    return getPublicUser(user);
  }
}
