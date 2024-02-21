import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto, UserLoginDto } from 'src/user/dto/user.query.dto';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/response.util';

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
    public async login(@Body() userloginDto: UserLoginDto) {
        const data = await this.authService.loginUser(userloginDto);

        const response = await this.responseService.generateApiResponse(
            200,
            'User logged in successfully',
            '/v1/auth/login',
            '1234',
            '0.1234',
            data,
        );

        return response;
    }

    // Register fucntion
    @Post('/register')
    public async register(@Body() createUserDto: UserCreateDto) {
        return await this.userService.create(createUserDto);
    }
}
