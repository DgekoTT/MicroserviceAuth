import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/user.model";
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-role.model";
import {UsersModule} from "./users/users.module";
import {RolesModule} from "./roles/roles.module";
import {AuthModule} from "./auth/auth.module";
import {TokenModule} from "./token/token.module";
import {Token} from "./token/token.model";
import {ConfigModule} from "@nestjs/config";


@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule.forRoot({
     envFilePath: `.${process.env.NODE_ENV}.env`   /*получаем конфигурации
         для разработки и для продакшена, нужно npm i cross-env*/
  }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Token],
      autoLoadModels: true
  }),
    UsersModule,
    RolesModule,
    AuthModule,
    TokenModule,]
})
export class AppModule {}
