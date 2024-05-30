// src/candidatos/candidatos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidato } from 'src/entities/candidato.entity';
import { CheckCandidatoDto } from './check-candidato.dto';

@Injectable()
export class CandidatosService {
  constructor(
    @InjectRepository(Candidato)
    private candidatosRepository: Repository<Candidato>,
  ) {}

  async checkCandidato(checkCandidatoDto: CheckCandidatoDto): Promise<boolean> {
    const { consultaId, userId } = checkCandidatoDto;
    const candidato = await this.candidatosRepository.findOne({
      where: {
        consulta: { id: consultaId },
        user: { id: userId },
      },
    });
    return !!candidato;
  }

  async addCandidato(checkCandidatoDto: CheckCandidatoDto): Promise<Candidato> {
    const { consultaId, userId } = checkCandidatoDto;
    const candidato = this.candidatosRepository.create({
      consulta: { id: consultaId },
      user: { id: userId },
      fechaCandidatura: new Date(),
    });
    return this.candidatosRepository.save(candidato);
  }
}
