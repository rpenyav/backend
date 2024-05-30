// src/candidatos/candidatos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidato } from 'src/entities/candidato.entity';
import { CheckCandidatoDto } from './check-candidato.dto';
import { Consulta } from 'src/entities/consulta.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CandidatosService {
  constructor(
    @InjectRepository(Candidato)
    private candidatosRepository: Repository<Candidato>,
    @InjectRepository(Consulta)
    private consultasRepository: Repository<Consulta>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

    // Verificar si la consulta existe
    const consulta = await this.consultasRepository.findOne({
      where: { id: consultaId },
    });
    if (!consulta) {
      throw new NotFoundException(`Consulta with id ${consultaId} not found`);
    }

    // Verificar si el usuario existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const candidato = this.candidatosRepository.create({
      consulta,
      user,
      fechaCandidatura: new Date(),
    });
    return this.candidatosRepository.save(candidato);
  }

  async deleteCandidato(id: number): Promise<{ message: string }> {
    const result = await this.candidatosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Candidato with id ${id} not found`);
    }
    return { message: `Candidato with id ${id} has been deleted successfully` };
  }
}
