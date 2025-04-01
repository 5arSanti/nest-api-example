import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FilterUsersDTO, UserDTO, UserIdDTO, UserPrimaryInfoDTO, UserResponseDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
    private users: UserDTO[] = [];

    async getUsers(usersFilters: FilterUsersDTO): Promise<UserResponseDTO[] | UserPrimaryInfoDTO[]> {
        let filteredUsers = this.users;

        if (usersFilters.no_details) {
            return filteredUsers.map(user => ({
                id: user.id,
                name: user.nombre,
                last_name: user.apellido,
            }));
        }

        return filteredUsers.map(user => ({
            id: user.id,
            name: user.nombre,
            last_name: user.apellido,
        }));
    }

    async registrarUsuario(userInfo: UserDTO) {
        const { id, nombre, apellido } = userInfo;

        const usuarioExistente = this.users.find(user => user.id === id);

        if (usuarioExistente) {
            throw new BadRequestException('Este usuario ya se encuentra registrado');
        }

        const saltRounds = 10;

        this.users.push({
            id,
            nombre,
            apellido,
        });
    }

    async deleteUser(user: UserIdDTO) {
        const userIndex = this.users.findIndex(u => u.id === user.id);

        if (userIndex === -1) {
            throw new NotFoundException('Usuario no encontrado');
        }

        this.users.splice(userIndex, 1);

        return { message: 'Usuario eliminado correctamente' };
    }
}