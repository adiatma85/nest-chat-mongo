import { Injectable } from '@nestjs/common';
import { User } from 'src/schema/user..schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto, UserLoginDto } from './dto/user.query.dto';
import { UsersProfile } from './interfaces/user.interfaces';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    public async create(userCreateDto:UserCreateDto) : Promise<UsersProfile> {
        const newUser = await this.userModel.create(userCreateDto);
        return newUser;
    }

    public async loginUser(userLoginDto: UserLoginDto) : Promise<UsersProfile> {
        const { email, password } = userLoginDto;
        const user = await this.userModel.findOne({
            email
        }).exec();

        if (user && (await user.matchPassword(password))) {
            return user;
        } else {
            return null;
        }
    }

    // Will return all user from mongodb user model schema
    public async findAll(searchKeyword?: string): Promise<User[]> {
        const keyword = searchKeyword
            ? {
                $or: [
                    { name: { $regex: searchKeyword, $options: "i" } },
                    { email: { $regex: searchKeyword, $options: "i" } },
                ],
            }
            : {};

        return await this.userModel
            .find(keyword)
            .exec();
    }

}
