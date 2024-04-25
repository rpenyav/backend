import { TestSuite } from 'src/entities/testsuite.entity';

export class PaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: T[];
}
