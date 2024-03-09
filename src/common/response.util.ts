import { HttpException } from '@nestjs/common';
import { ErrorDTO } from './response.dto';

export function TransformError(error: any) : ErrorDTO{
  return error as ErrorDTO
}

export class AllException extends HttpException {
  errorDTO : ErrorDTO
  constructor(erroDTO : ErrorDTO) {
    super(erroDTO.errorMessage, erroDTO.errorNumber);

    this.errorDTO = erroDTO
  }
}
