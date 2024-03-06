import { Controller, Get, Query, Body, Patch, Delete, Param, Req, HttpStatus, ExecutionContext } from '@nestjs/common';
import { ResponseService } from 'src/common/response.util';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PtestingService } from './ptesting.service';
import { GetAcceptLanguage } from 'src/common/context-function';
import { ContextKey } from 'src/common/context-key';

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

            // Eksperimen buat ngambil konteks language

            // console.log("Konteks adalah: ", context)
            let bahasa = GetAcceptLanguage(request)
            console.log("Bahasa adalah: ", bahasa)


            return await this.responseService.ReturnHttpSuccess(request, data);
        } catch (error) {
            console.log(error)
            return await this.responseService.ReturnHttpError(request, HttpStatus.INTERNAL_SERVER_ERROR);
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
            return await this.responseService.ReturnHttpError(request, HttpStatus.BAD_REQUEST);
        }
    }
}
