import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: '654321' })
  @IsString()
  @MinLength(3)
  newPassword: string;
}
