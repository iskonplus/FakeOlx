import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Test_User' })
  @IsString()
  login: string;

  @ApiProperty({ example: '123456', minLength: 3 })
  @IsString()
  @MinLength(3)
  password: string;
}
