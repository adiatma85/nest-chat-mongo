import { Controller, Get, Query, Body, Patch, Delete, Param, Req, HttpStatus, ExecutionContext } from '@nestjs/common';
import { ResponseService } from 'src/common/response.util';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PtestingService } from './ptesting.service';

@ApiTags('ptesting')
@Controller('ptesting')
export class PtestingController {
    constructor(
        private readonly ptestingSerivce: PtestingService,
        private readonly responseService: ResponseService,
    ) { }
    
    // Testing for path
    @Get('ptesting')
    async getData(@Req() request: Request) {
        try {
            const data = {
                message: await this.ptestingSerivce.getHello()
            }

            return await this.responseService.ReturnHttpSuccess(request, data);
        } catch (error) {
            return await this.responseService.ReturnHttpError(request, HttpStatus.INTERNAL_SERVER_ERROR, "testing error");
        }
    }

    @Get('ptesting-fail')
    async getDataFail(@Req() request: Request) {
        try {
            const data = {
                message: await this.ptestingSerivce.getHelloFail()
            }
            return await this.responseService.ReturnHttpSuccess(request, data);
        } catch (error) {
            return await this.responseService.ReturnHttpError(request, HttpStatus.BAD_REQUEST, "testing error");
        }
    }
}
