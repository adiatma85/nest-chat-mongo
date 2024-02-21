import { Controller, Get, Query, Body, Patch, Delete, Param, Req, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueryDto, UserUpdateDto } from './dto/user.query.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ResponseService } from 'src/common/response.util';

@ApiTags('users')
@Controller('v1/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly responseService: ResponseService,
    ) { }

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
        try {
            const data = {
                message: "Hello World"
            }
            return await this.responseService.ReturnHttpSuccess(request, data);
        } catch (error) {
            console.log(error)
        }
    }

    @Get('ptesting-fail')
    async getDataFail(@Req() request: Request) {
        try {
            return await this.responseService.ReturnHttpError(request, HttpStatus.BAD_REQUEST);
        } catch (error) {
            console.log(error)
        }
    }
}
