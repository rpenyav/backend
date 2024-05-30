import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { TestSuiteController } from './testsuite/testsuite.controller';
import { TestSuiteService } from './testsuite/testsuite.service';
import { TestSuite } from './entities/testsuite.entity';
import { Projects } from './entities/projects.entity';
import { ProjectController } from './projects/project.controller';
import { ProjectService } from './projects/project.service';
import { Comments } from './entities/comments.entity';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { ProductController } from './products/product.controller';
import { ProductService } from './products/product.service';
import { ProductCategory } from './entities/product-category.entity';
import { Product } from './entities/product.entity';
import { Consulta } from './entities/consulta.entity';
import { ConsultasController } from './consultas/consultas.controller';
import { ConsultasService } from './consultas/consultas.service';
import { Tratamiento } from './entities/tratamiento.entity';
import { ProductoAplicado } from './entities/producto-aplicado.entity';
import { Candidato } from './entities/candidato.entity';
import { CandidatosController } from './candidatos/candidatos.controller';
import { CandidatosService } from './candidatos/candidatos.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'qaei887.rafapenya.com',
      port: 3306,
      username: 'qaei887',
      password: 'JRK441e22',
      database: 'qaei887',
      entities: [
        User,
        TestSuite,
        Projects,
        Comments,
        Product,
        ProductCategory,
        Consulta,
        Tratamiento,
        ProductoAplicado,
        Candidato,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      TestSuite,
      Projects,
      Comments,
      Product,
      ProductCategory,
      Consulta,
      Tratamiento,
      ProductoAplicado,
      Candidato,
    ]),
    AuthModule,
  ],
  controllers: [
    UserController,
    TestSuiteController,
    ProjectController,
    CommentsController,
    ProductController,
    ConsultasController,
    CandidatosController,
  ],
  providers: [
    UserService,
    TestSuiteService,
    ProjectService,
    CommentsService,
    ProductService,
    ConsultasService,
    CandidatosService,
  ],
})
export class AppModule {}
