import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto, UserLoginDto } from 'src/user/dto/user.query.dto';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    // Login function
    @Post('/login')
    public async login(@Body() userloginDto: UserLoginDto) {
        // return await this.userService.loginUser(userloginDto);
        return this.authService.loginUser(userloginDto);
    }

    // Register fucntion
    @Post('/register')
    public async register(@Body() createUserDto: UserCreateDto) {
        return await this.userService.create(createUserDto);
    }
}
