// src/testsuites/dto/create-testsuite.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateTestSuiteDto {
  @IsString()
  sectionTest: string;

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
}
