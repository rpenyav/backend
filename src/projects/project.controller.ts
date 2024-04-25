import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProjectDto } from './create-project.dto';
import { ProjectService } from './project.service';
import { PaginatedResponse } from './paginated-response.dto';
import { Projects } from 'src/entities/projects.entity';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('add')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('get')
  getAllProjects(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('orderBy') orderBy: string, // Nueva query param para ordenar
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC', // Nueva query param para dirección de ordenamiento
  ): Promise<PaginatedResponse<Projects>> {
    return this.projectService.getAllProjects(
      page,
      limit,
      orderBy,
      orderDirection,
    );
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number): Promise<Projects | undefined> {
    return this.projectService.getProjectById(id);
  }
}
