import { TestSuite } from 'src/entities/testsuite.entity';

export class PaginatedResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: TestSuite[];
}
