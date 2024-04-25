import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTestSuiteDto } from './create-testsuite.dto';
import { TestSuiteService } from './testsuite.service';
import { PaginatedResponse } from './paginated-response.dto'; // Importamos el nuevo DTO
import { TestSuite } from 'src/entities/testsuite.entity';
import { UpdateTestSuiteDto } from './edit-testsuite.dto';

@Controller('testsuite')
export class TestSuiteController {
  constructor(private testSuiteService: TestSuiteService) {}

  @Post('add')
  createTestSuite(@Body() createTestSuiteDto: CreateTestSuiteDto) {
    return this.testSuiteService.createTestSuite(createTestSuiteDto);
  }

  @Get('get')
  getAllTestSuites(
    @Query('orderBy') orderBy: string, // Nueva query param para ordenar
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC', // Nueva query param para dirección de ordenamiento
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('page', ParseIntPipe) page: number = 1,
  ): Promise<PaginatedResponse<TestSuite>> {
    return this.testSuiteService.getAllTestSuites(
      page,
      limit,
      orderBy,
      orderDirection,
    );
  }

  @Get('getbyproject')
  getTestSuitesByProjectId(
    @Query('projectId') projectId: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('orderBy') orderBy: string,
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC',
  ): Promise<PaginatedResponse<TestSuite>> {
    return this.testSuiteService.getTestSuitesByProjectId(
      projectId,
      page,
      limit,
      orderBy,
      orderDirection,
    );
  }

  @Get('search')
  searchTestSuites(
    @Query('sectionTest') sectionTest?: string,
    @Query('numberTest') numberTest?: string,
    @Query('titleTest') titleTest?: string,
    @Query('testCreator') testCreator?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC',
  ): Promise<PaginatedResponse<TestSuite>> {
    return this.testSuiteService.searchTestSuites(
      { sectionTest, numberTest, titleTest, testCreator },
      page,
      limit,
      orderBy,
      orderDirection,
    );
  }

  @Get(':id')
  getTestSuiteById(@Param('id', ParseIntPipe) id: number): Promise<TestSuite> {
    return this.testSuiteService.getTestSuiteById(id);
  }

  @Put('edit/:id')
  async updateTestSuite(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestSuiteDto: UpdateTestSuiteDto,
  ): Promise<TestSuite> {
    return this.testSuiteService.updateTestSuite(id, updateTestSuiteDto);
  }
}
