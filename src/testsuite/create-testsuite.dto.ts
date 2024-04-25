// src/testsuites/dto/create-testsuite.dto.ts
import { IsString, IsEmail, IsNumber, IsInt } from 'class-validator';

export class CreateTestSuiteDto {
  @IsString()
  sectionTest: string;

  @IsInt()
  projectId: number;

  @IsString()
  linkTest: string;

  @IsString()
  screenshotTest: string;

  @IsString()
  numberTest: string;

  @IsString()
  titleTest: string;

  @IsString()
  descriptionTest: string;

  @IsString()
  dateTest: string;

  @IsString()
  testCreator: string;

  @IsString()
  testConditions: string;

  @IsString()
  testResult: string;

  @IsString()
  testPriority: string;

  @IsString()
  testStatus: string;
}
