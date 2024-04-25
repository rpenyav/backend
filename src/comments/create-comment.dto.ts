// src/comments/dto/create-comment.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  IsDateString,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  commentText: string;

  @IsString()
  commenterName: string;

  @IsEmail()
  commenterEmail: string;

  @IsNumber()
  testSuiteId: number;

  @IsString()
  @IsDateString()
  commentCreatedAt: string;
}
