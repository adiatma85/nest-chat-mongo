import { Body, Controller, Post, HttpStatus, Req, HttpCode } from '@nestjs/common';
import { UserCreateDto, UserLoginDto } from 'src/user/dto/user.query.dto';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/response.util';
import { Request } from 'express';

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
    @HttpCode(HttpStatus.OK)
    // Apply all the repsonse to other endpoints too
    public async login(@Body() userloginDto: UserLoginDto, @Req() request: Request) {
        try {
            const data = await this.authService.loginUser(userloginDto);
            return data
            // const responseBody = await this.responseService.ReturnHttpSuccess(request, data);
            // return responseBody;
        } catch (error) {
            throw error
        }
    }

    // Register fucntion
    @Post('/register')
    public async register(@Body() createUserDto: UserCreateDto, @Req() request: Request) {
        try {
            const data = await this.authService.registerUser(createUserDto);
            const response = await this.responseService.ReturnHttpSuccess(request, data);
            return response;
        } catch (error) {
            throw error
        }
    }
}
