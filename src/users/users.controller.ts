import { Body, Controller, Delete, Get, HttpException, InternalServerErrorException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FilterUsersDTO, RegisterUserDTO, UserIdDTO, UserResponseDTO, UsersResponseDTO } from './dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }

  @UseGuards(JwtAuthGuard, TeacherRoleGuard)
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
  async registerUser(@Body() userInfo: RegisterUserDTO) {
    try {
      await this.usersService.registrarUsuario(userInfo);

      return { success: true, message: 'Usuario registrado con éxito' }
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard, TeacherRoleGuard)
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
