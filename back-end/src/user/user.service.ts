import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { PublicUser } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';

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

  getAllUsers(): PublicUser[] {
    return this.users.map((user) => this.getPublicUser(user));
  }

  findOne(id: string): PublicUser {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.getPublicUser(user);
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

  updateUser(dto: UpdatePasswordDto, id: string): PublicUser {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== dto.oldPassword) {
      throw new Error('Old password is incorrect');
    }

    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = this.now();

    return this.getPublicUser(user);
  }

  deleteUser(id: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users.splice(userIndex, 1);
  }
}
