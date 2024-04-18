import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTestSuiteDto } from './create-testsuite.dto';
import { TestSuiteService } from './testsuite.service';
import { PaginatedResponse } from './paginated-response.dto'; // Importamos el nuevo DTO

@Controller('testsuite')
export class TestSuiteController {
  constructor(private testSuiteService: TestSuiteService) {}

  @Post('add')
  createTestSuite(@Body() createTestSuiteDto: CreateTestSuiteDto) {
    return this.testSuiteService.createTestSuite(createTestSuiteDto);
  }

  @Get('get')
  getAllTestSuites(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('orderBy') orderBy: string, // Nueva query param para ordenar
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC', // Nueva query param para dirección de ordenamiento
  ): Promise<PaginatedResponse> {
    return this.testSuiteService.getAllTestSuites(
      page,
      limit,
      orderBy,
      orderDirection,
    );
  }
}
