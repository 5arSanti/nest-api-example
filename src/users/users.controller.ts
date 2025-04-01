import { Body, Controller, Delete, Get, HttpException, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { FilterUsersDTO, UserDTO, UserIdDTO, UsersResponseDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }

  @Get()
  async getUsers(@Query() usersFilters: FilterUsersDTO): Promise<UsersResponseDTO> {
    try {
      const users = await this.usersService.getUsers(usersFilters);

      return { users };
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }


  @Post()
  async registerUser(@Body() userInfo: UserDTO) {
    try {
      await this.usersService.registrarUsuario(userInfo);

      return { success: true, message: 'Usuario registrado con éxito' }
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete()
  async deleteUser(@Query() user: UserIdDTO) {
    try {
      await this.usersService.deleteUser(user);

      return { success: true, message: 'Usuario eliminado con éxito' };
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }
}
