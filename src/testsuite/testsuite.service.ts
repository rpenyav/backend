import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestSuite } from 'src/entities/testsuite.entity';
import { CreateTestSuiteDto } from './create-testsuite.dto';
import { PaginatedResponse } from './paginated-response.dto'; // Importamos el nuevo DTO

@Injectable()
export class TestSuiteService {
  constructor(
    @InjectRepository(TestSuite)
    private testSuiteRepository: Repository<TestSuite>,
  ) {}

  async createTestSuite(
    createTestSuiteDto: CreateTestSuiteDto,
  ): Promise<TestSuite> {
    const newTestSuite = this.testSuiteRepository.create(createTestSuiteDto);
    await this.testSuiteRepository.save(newTestSuite);
    return newTestSuite;
  }

  async getAllTestSuites(
    page: number,
    limit: number,
    orderBy?: string, // Hacer el parámetro opcional
    orderDirection?: 'ASC' | 'DESC', // Hacer el parámetro opcional
  ): Promise<PaginatedResponse> {
    const skip = (page - 1) * limit;
    let query = this.testSuiteRepository
      .createQueryBuilder('testSuite')
      .skip(skip >= 0 ? skip : 0)
      .take(limit > 0 ? limit : 10);

    if (orderBy && orderDirection) {
      // Verificar si los parámetros están presentes
      query = query.orderBy(`testSuite.${orderBy}`, orderDirection); // Aplicar ordenamiento si están presentes
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
}
