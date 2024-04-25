import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestSuite } from 'src/entities/testsuite.entity';
import { CreateTestSuiteDto } from './create-testsuite.dto';
import { PaginatedResponse } from './paginated-response.dto'; // Importamos el nuevo DTO
import { UpdateTestSuiteDto } from './edit-testsuite.dto';

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
  ): Promise<PaginatedResponse<TestSuite>> {
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

  async getTestSuitesByProjectId(
    projectId: string,
    page: number,
    limit: number,
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<PaginatedResponse<TestSuite>> {
    const skip = (page - 1) * limit;
    let query = this.testSuiteRepository
      .createQueryBuilder('testSuite')
      .where('testSuite.projectId = :projectId', { projectId })
      .skip(skip)
      .take(limit);

    if (orderBy && orderDirection) {
      query = query.orderBy(`testSuite.${orderBy}`, orderDirection);
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

  async searchTestSuites(
    filters: {
      sectionTest?: string;
      titleTest?: string;
      numberTest?: string;
      testCreator?: string;
    },
    page: number,
    limit: number,
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<PaginatedResponse<TestSuite>> {
    const skip = (page - 1) * limit;
    let query = this.testSuiteRepository.createQueryBuilder('testSuite');

    // Agregar condiciones de búsqueda
    let conditions = [];
    if (filters.sectionTest) {
      conditions.push(`testSuite.sectionTest LIKE :sectionTest`);
    }
    if (filters.titleTest) {
      conditions.push(`testSuite.titleTest LIKE :titleTest`);
    }

    if (filters.numberTest) {
      conditions.push(`testSuite.sectionTest LIKE :sectionTest`);
    }
    if (filters.testCreator) {
      conditions.push(`testSuite.titleTest LIKE :titleTest`);
    }

    // Combinar todas las condiciones con 'OR'
    if (conditions.length > 0) {
      query = query.where(conditions.join(' OR '), {
        sectionTest: `%${filters.sectionTest}%`,
        titleTest: `%${filters.titleTest}%`,
      });
    }

    if (orderBy && orderDirection) {
      query = query.orderBy(`testSuite.${orderBy}`, orderDirection);
    }

    query = query.skip(skip).take(limit);

    const [list, totalElements] = await query.getManyAndCount();
    const totalPages = Math.ceil(totalElements / limit);
    return {
      list,
      pageNumber: page,
      pageSize: limit,
      totalElements,
      totalPages,
      isLast: page === totalPages,
    };
  }

  async getTestSuiteById(id: number): Promise<TestSuite> {
    const testSuite = await this.testSuiteRepository.findOne({
      where: { id: id },
      relations: ['comments'], // 'comments' es el nombre del campo en la entidad TestSuite que define la relación
    });

    if (!testSuite) {
      throw new NotFoundException(`TestSuite with ID ${id} not found`);
    }
    return testSuite;
  }

  async updateTestSuite(
    id: number,
    updateTestSuiteDto: UpdateTestSuiteDto,
  ): Promise<TestSuite> {
    if (updateTestSuiteDto.projectId) {
      updateTestSuiteDto.projectId = parseInt(
        updateTestSuiteDto.projectId.toString(),
        10,
      );
    }

    const testSuite = await this.testSuiteRepository.findOne({
      where: { id: id },
    });

    if (!testSuite) {
      throw new NotFoundException(`TestSuite with ID ${id} not found`);
    }

    Object.assign(testSuite, updateTestSuiteDto);

    await this.testSuiteRepository.save(testSuite);

    return testSuite;
  }
}
