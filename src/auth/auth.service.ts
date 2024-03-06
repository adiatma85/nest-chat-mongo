import { HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto, UserQueryDto } from 'src/user/dto/user.query.dto';
import { Model } from 'mongoose';
import { User } from 'src/schema/user..schema';
import { InjectModel } from '@nestjs/mongoose';
import { LoginResponse } from './dto/auth.dto';
import { TransformToDTO } from 'src/common/response.util';
import { ErrorDTO } from 'src/common/response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async loginUser(userLoginDto: UserLoginDto) : Promise<LoginResponse | ErrorDTO> {
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
            throw error
        }
    }
}
