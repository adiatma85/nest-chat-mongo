import { Controller, Get, Query, Body, Patch, Delete, Param, Req, HttpStatus, ExecutionContext } from '@nestjs/common';
import { AllException } from 'src/common/response.util';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PtestingService } from './ptesting.service';
import { TransformError } from 'src/common/response.util';

@ApiTags('ptesting')
@Controller('ptesting')
export class PtestingController {
    constructor(
        private readonly ptestingSerivce: PtestingService,
    ) { }
    
    // Testing for path
    @Get('ptesting')
    async getData(@Req() request: Request) {
        try {
            const data = {
                message: await this.ptestingSerivce.getHello()
            }

            return data
        } catch (error) {
            throw new AllException(TransformError(error))
        }
    }

    @Get('ptesting-fail')
    async getDataFail(@Req() request: Request) {
        try {
            const data = {
                message: await this.ptestingSerivce.getHelloFail()
            }
            return data
        } catch (error) {
            throw new AllException(TransformError(error))
        }
    }
}
