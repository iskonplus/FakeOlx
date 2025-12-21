import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { PublicUser } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  users: User[] = [];

  private getPublicUser(user: User): PublicUser {
    const publicUser = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return publicUser;
  }

  private now = () => Math.floor(Date.now() / 1000);

  getAllPublicUsers(): PublicUser[] {
    return this.users.map((user) => this.getPublicUser(user));
  }

  createUser(dto: CreateUserDto): PublicUser {
    const newUser = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: this.now(),
      updatedAt: null,
    };

    this.users.push(newUser);
    return this.getPublicUser(newUser);
  }
}
