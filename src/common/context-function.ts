// This is the file that contain functions to add context keys to our request object

import { ExecutionContext } from '@nestjs/common';
import { ContextKey } from './context-key';
import { LanguageEnum } from './language';


// Set Accept Language
export function SetAcceptLanguage(executionContext: ExecutionContext, lang: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.AcceptLanguage] = lang;

    return request;
}

// Get Accept Language
export function GetAcceptLanguage(ctx: ExecutionContext): string {
    // Return English as the default language
    const lang = ctx.switchToHttp().getRequest().context?.AcceptLanguage as string | undefined;
    if (!lang) {
        return LanguageEnum.EN;
    }

    return lang;
}