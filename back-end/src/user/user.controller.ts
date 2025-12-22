import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'Returns a list of all users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Return user by id' })
  getUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User created' })
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put('/:id')
  @ApiBody({ type: UpdatePasswordDto })
  @ApiOkResponse({ description: 'User password updated' })
  updateUserPassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.userService.updateUser(dto, id);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'User deleted' })
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.deleteUser(id);
  }
}
