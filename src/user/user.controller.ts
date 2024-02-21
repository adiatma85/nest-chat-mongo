import { Controller, Get, Query, Body, Patch, Delete, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueryDto, UserUpdateDto } from './dto/user.query.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ResponseService } from 'src/common/response.util';

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
    public async delete(@Param('id') id: string) {
        const buildParam = new UserQueryDto(
            {
                id
            },
        );

        return this.userService.delete(buildParam);
    }

    // Testing for path
    @Get('ptesting')
    async getData(@Req() request: Request) {
        const path = request.path; // This will give you the path that was accessed
        console.log('Path accessed:', path);

        // Your logic here
    }
}
