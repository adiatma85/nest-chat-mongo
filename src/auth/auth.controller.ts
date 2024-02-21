import { Body, Controller, Post, HttpStatus, Req } from '@nestjs/common';
import { UserCreateDto, UserLoginDto } from 'src/user/dto/user.query.dto';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/response.util';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly responseService: ResponseService,
    ) { }

    // Login function
    @Post('/login')
    // Apply all the repsonse to other endpoints too
    public async login(@Body() userloginDto: UserLoginDto, @Req() request: Request) {
        const data = await this.authService.loginUser(userloginDto);

        const response = await this.responseService.ReturnHttpSuccess(request, data);
        return response;
    }

    // Register fucntion
    @Post('/register')
    public async register(@Body() createUserDto: UserCreateDto) {
        return await this.userService.create(createUserDto);
    }
}
