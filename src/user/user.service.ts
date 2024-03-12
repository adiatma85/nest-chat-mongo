import { Injectable } from '@nestjs/common';
import { User } from 'src/schema/user..schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto, UserLoginDto, UserQueryDto, UserUpdateDto } from './dto/user.query.dto';
import { UsersProfile } from './interfaces/user.interfaces';
import { AllException, TransformError } from 'src/common/response.util';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    public async create(userCreateDto: UserCreateDto): Promise<UsersProfile> {
        try {
            const newUser = await this.userModel.create(userCreateDto);
            return newUser;
        } catch (error) {
            // Handle error
            throw new Error('Failed to create user');
        }
    }

    public async findAll(searchKeyword?: string): Promise<User[]> {
        try {
            const keyword = searchKeyword
                ? {
                    $or: [
                        { name: { $regex: searchKeyword, $options: "i" } },
                        { email: { $regex: searchKeyword, $options: "i" } },
                    ],
                }
                : {};
    
            return await this.userModel.find(keyword).exec();
        } catch (error) {
            // Handle error
            throw new AllException(TransformError(error));
        }
    }

    public async findOne(param: UserQueryDto) {
        try {
            const user = await this.userModel.findOne(param).exec();
            return user;
        } catch (error) {
            // Handle error
            throw new Error('Failed to find user');
        }
    }


    public async update(param: UserQueryDto, userUpdateDto: UserUpdateDto) {
        try {
            const user = await this.userModel.updateMany(param, { $set: userUpdateDto });
            return user;
        } catch (error) {
            // Handle error
            throw new AllException(TransformError(error));
        }
    }

    public async delete(param: UserQueryDto) {
        try {
            const user = await this.userModel.deleteMany(param);
            return user;
        } catch (error) {
            // Handle error
            throw new AllException(TransformError(error));
        }
    }
}
