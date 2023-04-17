
import {IsEmail, IsString, Length} from "class-validator";

export class AuthUserDto {

    @IsString({message: " Должно быть строкой"})
    @IsEmail({},{message: 'Некорректный емайл'})
    readonly email: string;

    @IsString({message: " Должно быть строкой"})
    @Length(8, 16, {message: "Пароль от 8 до 16 симолов"})
    readonly password: string;
}