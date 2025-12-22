import { Injectable } from '@nestjs/common';
import { PublicUser } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { getUsers, getPublicUser } from 'src/db/db';

@Injectable()
export class UserService {
  private users = getUsers();
  private now = () => Math.floor(Date.now() / 1000);

  getAllUsers(): PublicUser[] {
    return this.users.map((user) => getPublicUser(user));
  }

  findOne(id: string): PublicUser {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return getPublicUser(user);
  }

  createUser(dto: CreateUserDto): PublicUser {
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

    return getPublicUser(user);
  }

  deleteUser(id: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users.splice(userIndex, 1);
  }
}
