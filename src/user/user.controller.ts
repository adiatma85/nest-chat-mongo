import { Controller, Get, Post, Query, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserLoginDto } from './dto/user.query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('v1/user')
export class UserController {
    constructor(private readonly userService : UserService) {}

    @Get()
    public async findAll(
        @Query('search') search?: string
    ) {
        // This function does not have any validation
        // This function does not proper error handling
        return await this.userService.findAll(search);
    }

    @Post()
    public async createUser(@Body() userCreateDto: UserCreateDto) {
        try {
            const user = await this.userService.create(userCreateDto);
      
            return {
              message: 'user has been created successfully',
              user,
            };
          } catch (err) {
            // Take note this bad request exception is really poord handled
            throw new BadRequestException(err, 'Error: User not created!');
          }
    }

    @Post('/login')
    public async login(@Body() userLoginDTO: UserLoginDto) {
        return await this.userService.loginUser(userLoginDTO);
    }
}
