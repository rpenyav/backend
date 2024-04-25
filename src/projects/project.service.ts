import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from 'src/entities/projects.entity';
import { CreateProjectDto } from './create-project.dto';
import { PaginatedResponse } from './paginated-response.dto'; // Importamos el nuevo DTO

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Projects> {
    const newProject = this.projectRepository.create(createProjectDto);
    await this.projectRepository.save(newProject);
    return newProject;
  }

  async getAllProjects(
    page: number,
    limit: number,
    orderBy?: string, // Hacer el parámetro opcional
    orderDirection?: 'ASC' | 'DESC', // Hacer el parámetro opcional
  ): Promise<PaginatedResponse<Projects>> {
    const skip = (page - 1) * limit;
    let query = this.projectRepository
      .createQueryBuilder('project')
      .skip(skip >= 0 ? skip : 0)
      .take(limit > 0 ? limit : 10);

    if (orderBy && orderDirection) {
      // Verificar si los parámetros están presentes
      query = query.orderBy(`project.${orderBy}`, orderDirection); // Aplicar ordenamiento si están presentes
    }

    const [list, totalElements] = await query.getManyAndCount();
    const totalPages = Math.ceil(totalElements / limit);
    const isLast = page === totalPages;

    return {
      list,
      pageNumber: page,
      pageSize: limit,
      totalElements,
      totalPages,
      isLast,
    };
  }

  async getProjectById(projectId: number): Promise<Projects | undefined> {
    return this.projectRepository.findOne({ where: { id: projectId } });
  }
}
