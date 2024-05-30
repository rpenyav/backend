import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from 'src/entities/consulta.entity';
import { Tratamiento } from 'src/entities/tratamiento.entity';
import { ProductoAplicado } from 'src/entities/producto-aplicado.entity';
import { Candidato } from 'src/entities/candidato.entity';
import { CreateConsultaDto } from './create-consulta.dto';
import { PaginatedResponse } from './paginated-response.dto';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private consultasRepository: Repository<Consulta>,
    @InjectRepository(Tratamiento)
    private tratamientosRepository: Repository<Tratamiento>,
    @InjectRepository(ProductoAplicado)
    private productosAplicadosRepository: Repository<ProductoAplicado>,
    @InjectRepository(Candidato)
    private candidatosRepository: Repository<Candidato>,
  ) {}

  async createConsulta(
    createConsultaDto: CreateConsultaDto,
  ): Promise<Consulta> {
    const { tratamientos, productosAplicados, ...consultaData } =
      createConsultaDto;

    // Crear y guardar la consulta
    const consulta = this.consultasRepository.create(consultaData);
    await this.consultasRepository.save(consulta);

    // Crear y guardar los tratamientos
    for (const tratamientoDto of tratamientos) {
      const tratamiento = this.tratamientosRepository.create({
        ...tratamientoDto,
        consulta,
      });
      await this.tratamientosRepository.save(tratamiento);
    }

    // Crear y guardar los productos aplicados
    for (const productoDto of productosAplicados) {
      const productoAplicado = this.productosAplicadosRepository.create({
        ...productoDto,
        consulta,
      });
      await this.productosAplicadosRepository.save(productoAplicado);
    }

    return consulta;
  }

  async getConsultaById(id: number): Promise<Consulta> {
    return this.consultasRepository.findOne({
      where: { id },
      relations: ['tratamientos', 'productosAplicados', 'candidatos'],
    });
  }

  async getAllConsultas(
    page: number,
    limit: number,
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<PaginatedResponse<Consulta>> {
    const skip = (page - 1) * limit;

    let query = this.consultasRepository
      .createQueryBuilder('consulta')
      .leftJoinAndSelect('consulta.tratamientos', 'tratamientos')
      .leftJoinAndSelect('consulta.productosAplicados', 'productosAplicados')
      .leftJoinAndSelect('consulta.candidatos', 'candidatos')
      .skip(skip >= 0 ? skip : 0)
      .take(limit > 0 ? limit : 10);

    if (orderBy && orderDirection) {
      query = query.orderBy(`consulta.${orderBy}`, orderDirection);
    }

    const [list, totalElements] = await query.getManyAndCount();
    const totalPages = Math.ceil(totalElements / limit);
    const isLast = page >= totalPages;

    return {
      list,
      pageNumber: page,
      pageSize: limit,
      totalElements,
      totalPages,
      isLast,
    };
  }

  async addCandidato(
    consultaId: number,
    userId: number,
    fechaCandidatura: Date,
  ): Promise<Candidato> {
    const candidato = this.candidatosRepository.create({
      consulta: { id: consultaId },
      user: { id: userId },
      fechaCandidatura,
    });
    return this.candidatosRepository.save(candidato);
  }
}
