// src/consultas/consultas.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { Consulta } from 'src/entities/consulta.entity';
import { CreateConsultaDto } from './create-consulta.dto';
import { PaginatedResponse } from './paginated-response.dto';
import { Candidato } from 'src/entities/candidato.entity';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto): Promise<Consulta> {
    return this.consultasService.createConsulta(createConsultaDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Consulta> {
    return this.consultasService.getConsultaById(id);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection', new DefaultValuePipe('ASC'))
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<PaginatedResponse<Consulta>> {
    return this.consultasService.getAllConsultas(
      page,
      limit,
      orderBy,
      orderDirection,
    );
  }

  @Post(':id/candidatos')
  addCandidato(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
    @Body('fechaCandidatura') fechaCandidatura: Date,
  ): Promise<Candidato> {
    return this.consultasService.addCandidato(id, userId, fechaCandidatura);
  }
}
