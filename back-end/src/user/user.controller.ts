import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllPublicUsers();
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User created' })
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
