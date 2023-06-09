import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";

import {User} from "../users/user.model";
import {UserRoles} from "./user-role.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})//появится таблица с именем roles
export class Role extends Model<Role, RoleCreationAttrs> {

    // появятся указю колонки
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
        //получим id как число, уникальное автозаполненеие 1..2..3
    id: number;


    //allowNull: false не должен быть пустым
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;


    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    /*создаем связь многий ко многим между пользователями и ролями
    содениние FK будет в таблице UserRoles
     */
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}