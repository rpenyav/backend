// src/testsuites/dto/update-testsuite.dto.ts
import {
  IsOptional,
  IsString,
  IsInt,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTestSuiteDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  titleTest?: string;

  @IsOptional()
  @IsInt()
  projectId?: number;

  @IsOptional()
  @IsString()
  sectionTest?: string;

  @IsOptional()
  @IsString()
  descriptionTest?: string;

  @IsOptional()
  @IsString()
  linkTest?: string;

  @IsOptional()
  @IsString()
  screenshotTest: string;

  @IsOptional()
  @IsString()
  numberTest: string;

  @IsOptional()
  @IsString()
  dateTest: string;

  @IsOptional()
  @IsString()
  testCreator: string;

  @IsOptional()
  @IsString()
  testConditions: string;

  @IsOptional()
  @IsString()
  testResult: string;

  @IsOptional()
  @IsString()
  testPriority: string;

  @IsOptional()
  @IsString()
  testStatus: string;
}
