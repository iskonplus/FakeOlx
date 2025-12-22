import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'TestEmail@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '123456', minLength: 3 })
  @IsString()
  password: string;
}
