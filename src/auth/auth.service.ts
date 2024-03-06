import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto, UserQueryDto } from 'src/user/dto/user.query.dto';
import { Model } from 'mongoose';
import { User } from 'src/schema/user..schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        var param = new UserQueryDto()
        param.email = email

        const user = await this.userService.findOne(param);
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async loginUser(userLoginDto: UserLoginDto) {
        try {
            const { email, password } = userLoginDto;
            const user = await this.userModel.findOne({ email }).exec();

            if (user && (await user.matchPassword(password))) {
                const payload = { sub: user._id };
                return {
                    access_token: await this.jwtService.signAsync(payload),
                };
            } else {
                return null;
            }
            
        } catch (error) {
            // Handle error
            throw new Error('Failed to login');
        }
    }
}
