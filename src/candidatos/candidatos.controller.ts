// src/candidatos/candidatos.controller.ts
import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { CandidatosService } from './candidatos.service';
import { CheckCandidatoDto } from './check-candidato.dto';
import { Candidato } from 'src/entities/candidato.entity';

@Controller('candidatos')
export class CandidatosController {
  constructor(private readonly candidatosService: CandidatosService) {}

  @Post('check')
  async checkOrAddCandidato(
    @Body() checkCandidatoDto: CheckCandidatoDto,
  ): Promise<{ exists: boolean; candidato?: Candidato }> {
    const exists =
      await this.candidatosService.checkCandidato(checkCandidatoDto);
    if (exists) {
      return { exists };
    } else {
      const candidato =
        await this.candidatosService.addCandidato(checkCandidatoDto);
      return { exists: false, candidato };
    }
  }

  @Delete(':id')
  async deleteCandidato(@Param('id') id: number): Promise<{ message: string }> {
    return this.candidatosService.deleteCandidato(id);
  }
}
