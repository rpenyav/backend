import { Projects } from 'src/entities/projects.entity';

export class PaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: T[];
}
