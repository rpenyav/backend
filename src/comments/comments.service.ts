// src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './create-comment.dto';
import { Comments } from 'src/entities/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async findCommentsByTestSuiteId(testSuiteId: number): Promise<Comments[]> {
    return this.commentRepository.find({ where: { testSuiteId } });
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comments> {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }
}
