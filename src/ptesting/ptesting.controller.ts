import { Controller, Get, Query, Body, Patch, Delete, Param, Req, HttpStatus, ExecutionContext, UseGuards } from '@nestjs/common';
import { AllException } from 'src/common/response.util';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { PtestingService } from './ptesting.service';
import { TransformError } from 'src/common/response.util';
import { TokenGuard } from 'src/token/token.guard';
import { ContextKey } from 'src/common/context-key';

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

    @Get('ptesting-with-guard')
    @UseGuards(TokenGuard)
    @ApiBearerAuth()
    async getDataWithAuth(@Req() request: Request) {
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
