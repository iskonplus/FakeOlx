import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
