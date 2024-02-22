// This is the file that contain functions to add context keys to our request object

import { ExecutionContext } from '@nestjs/common';
import { ContextKey } from './context-key';
import { LanguageEnum } from './language';


// Set Accept Language
export function SetAcceptLanguage(executionContext: ExecutionContext, lang: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.AcceptLanguage] = lang;

    return executionContext;
}

// Get Accept Language
export function GetAcceptLanguage(executionContext: ExecutionContext): string {
    // Return English as the default language
    var request = executionContext.switchToHttp().getRequest();
    const lang = request.headers[ContextKey.AcceptLanguage] as string | undefined;
    if (!lang) {
        return LanguageEnum.EN;
    }

    return lang;
}