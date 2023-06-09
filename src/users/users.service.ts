// этот модуль мы создали командой nest generate service users

import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ClientProxy} from "@nestjs/microservices";
import {Observable} from "rxjs";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService,
                @Inject("AUTH_SERVICE") private readonly client: ClientProxy) {}

    async createUser(dto: CreateUserDto) {
        //создаем пользователя
        const user = await this.userRepository.create(dto);
        //получаем роль из базы
        const role = await this.roleService.getRoleByValue("USER") ;
        //перезаписаваем значение атрибу роль у пользователя в виде ид роли
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUser() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw  new HttpException('Подьзователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('Подьзователь не найдены', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save(); // сохраняем изменения в бд
        return user;
    }



    async delUser(data: number): Promise<[User, string]> {
        const user = await this.checkUser(data);
        const  res =await this.delPhase(data);
        return [user, res];
    }


    async delPhase(data: number): Promise<string> {
        try {
            const success = await this.userRepository.destroy({
                where: {
                    id: data
                }
            });
            return `Пользователь с id ${data} удален`;

        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async checkUser(id: number): Promise<any>{
        const user = await this.userRepository.findByPk(id);

        if(!user) {
            throw new HttpException(`Пользователь с id ${id} не найден `, HttpStatus.NOT_FOUND)
        }

        return user;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.checkUser(id);
        return user;
    }
}
