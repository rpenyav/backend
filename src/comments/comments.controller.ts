// src/comments/comments.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from 'src/entities/comments.entity';
import { CreateCommentDto } from './create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comments> {
    return this.commentsService.createComment(createCommentDto);
  }
}
