import { Controller, Get, Post, Query, Body, BadRequestException, Patch, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserDeleteDto, UserLoginDto, UserQueryDto, UserUpdateDto } from './dto/user.query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('v1/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    public async findAll(
        @Query('search') search?: string
    ) {
        return await this.userService.findAll(search);
    }

    // Update by id
    @Patch(":id")
    public async update(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto) {
        const buildParam = new UserQueryDto(
            {
                id
            },
        );

        return this.userService.update(buildParam, userUpdateDto);
    }

    // Delete by id
    @Delete(":id")
    public async delete(@Param('id') id : string) {
        const buildParam = new UserQueryDto(
            {
                id
            },
        );

        return this.userService.delete(buildParam);
    }
}
