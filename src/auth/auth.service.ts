import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/user/dto/user.query.dto';
import { Model } from 'mongoose';
import { User } from 'src/schema/user..schema';
import { InjectModel } from '@nestjs/mongoose';
import { LoginResponse, RegisterResponse } from './dto/auth.dto';
import { ErrorDTO } from 'src/common/response.dto';
import { UserCreateDto } from 'src/user/dto/user.query.dto';
import { AllException } from 'src/common/response.util';
import { TransformError } from 'src/common/response.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async registerUser(createUserDto: UserCreateDto) {
        try {
            const { email, name, password } = createUserDto

            if (!name || !email || !password) {
                throw new ErrorDTO(HttpStatus.BAD_REQUEST, "bad request")
            }

            const userExists = await this.userModel.findOne({ email }).exec();

            if (userExists) {
                throw new ErrorDTO(HttpStatus.BAD_REQUEST, "user already exist")
            }

            const newUser = await this.userModel.create(createUserDto);
            const response = new RegisterResponse(newUser)

            return response

        } catch (error) {
            throw new AllException(TransformError(error))
        }
    }

    async loginUser(userLoginDto: UserLoginDto): Promise<LoginResponse | ErrorDTO> {
        try {
            const { email, password } = userLoginDto;
            const user = await this.userModel.findOne({ email }).exec();

            if (user && (await user.matchPassword(password))) {
                const payload = { sub: user._id };
                const response = new LoginResponse(await this.jwtService.signAsync(payload))
                return response;
            } else {
                throw new ErrorDTO(HttpStatus.UNAUTHORIZED, "unmatch credential")
            }

        } catch (error) {
            throw new AllException(TransformError(error))
        }
    }
}
