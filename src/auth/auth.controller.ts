import { Body, Controller, Post, HttpStatus, Req, HttpCode } from '@nestjs/common';
import { UserCreateDto, UserLoginDto } from 'src/user/dto/user.query.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    // Login function
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    // Apply all the repsonse to other endpoints too
    public async login(@Body() userloginDto: UserLoginDto, @Req() request: Request) {
        try {
            const data = await this.authService.loginUser(userloginDto);
            return data
        } catch (error) {
            throw error
        }
    }

    // Register fucntion
    @Post('/register')
    public async register(@Body() createUserDto: UserCreateDto, @Req() request: Request) {
        try {
            const data = await this.authService.registerUser(createUserDto);
            return data;
        } catch (error) {
            throw error
        }
    }
}
