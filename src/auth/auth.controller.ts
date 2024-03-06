import { Body, Controller, Post, HttpStatus, Req } from '@nestjs/common';
import { UserCreateDto, UserLoginDto } from 'src/user/dto/user.query.dto';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseService, TransformToDTO } from 'src/common/response.util';
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
    // Apply all the repsonse to other endpoints too
    public async login(@Body() userloginDto: UserLoginDto, @Req() request: Request) {
        try {
            const data = await this.authService.loginUser(userloginDto);
            const response = await this.responseService.ReturnHttpSuccess(request, data);
            return response;
        } catch (error) {
            let errorObj = TransformToDTO(error)

            if (errorObj.errorNumber == 0) {
                return await this.responseService.ReturnHttpError(request, HttpStatus.INTERNAL_SERVER_ERROR, "internal server error");    
            }

            return await this.responseService.ReturnHttpError(request, errorObj.errorNumber, errorObj.errorMessage);
        }
    }

    // Register fucntion
    @Post('/register')
    public async register(@Body() createUserDto: UserCreateDto) {
        return await this.userService.create(createUserDto);
    }
}
