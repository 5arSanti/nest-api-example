import { Transform } from "class-transformer";
import {
    IsBoolean,
    IsBooleanString,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsStrongPassword,
    Max,
    MaxLength,
    Min,
    MinLength
} from "class-validator";

export class UserIdDTO {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(1000000)
    @Max(99999999999)
    id: number;
}

export class UserDTO extends UserIdDTO {
    @IsNotEmpty()
    @MinLength(1)
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;
}

export class FilterUsersDTO {
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true' || value === true) return true;
        if (value === 'false' || value === false) return false;
        return false;
    })
    @IsBoolean()
    no_details?: boolean;
}

export class UserPrimaryInfoDTO extends UserIdDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;
}


export class UserResponseDTO extends UserPrimaryInfoDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    role_id: string;

    @IsNotEmpty()
    @IsString()
    role_name: string;
}

export class UsersResponseDTO {
    users: UserResponseDTO[] | UserPrimaryInfoDTO[];
}