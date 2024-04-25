import { IsString, IsEmail, IsNumber, IsBoolean } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  projectName: string;

  @IsString()
  projectPrefix: string;

  @IsString()
  projectDescription: string;

  @IsString()
  projectPriority: string;

  @IsBoolean()
  projectActive: boolean;

  @IsBoolean()
  projectIsCompleted: boolean;

  @IsString()
  projectCreatedAt: string;

  @IsString()
  projectCreator: string;
}
