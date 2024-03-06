// This is the file that contain functions to add context keys to our request object
import { ExecutionContext } from '@nestjs/common';
import { ContextKey } from './context-key';
import { LanguageEnum } from './language';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';


// Get Accept Language
export function GetAcceptLanguage(request: Request): string {
    // Return English as the default language
    const lang = request.headers[ContextKey.AcceptLanguage] as string | undefined;
    if (!lang || lang == undefined) {
        return LanguageEnum.EN;
    }

    return lang;
}

// Set Request id
export function SetRequestId(request: Request) {
    request.headers[ContextKey.RequestId] = uuidv4();
}

// Get Request id
export function GetRequestId(request: Request): string {
    return request.headers[ContextKey.RequestId] as string;
}

// Set service version
export function SetServiceVersion(request: Request, version: string) {
    request.headers[ContextKey.ServiceVersion] = version;
}

// Get service version
export function GetServiceVersion(request: Request): string {
    return request.headers[ContextKey.ServiceVersion] as string;
}

// Set user id
export function SetUserId(request: Request, userId: string) {
    request.headers[ContextKey.UserId] = userId;
}

// Set user agent
export function SetUserAgent(request: Request, userAgent: string) {
    request.headers[ContextKey.UserAgent] = userAgent;
}

// Get User agent
export function GetUserAgent(request: Request): string {
    return request.headers[ContextKey.UserAgent] as string;
}

// Get user id
export function GetUserId(request: Request): string {
    return request.headers[ContextKey.UserId] as string;
}

// Set request start time
// export function SetRequestStartTime(request: Request, time: number) {
//     request.headers[ContextKey.RequestStartTime] = time;
// }

// Get request start time
// export function GetRequestStartTime(request: Request): number {
//     return request.headers[ContextKey.RequestStartTime] as number;
// }

// Set app responce code
// export function SetAppResponseCode(request: Request, code: number) {
//     request.headers[ContextKey.AppResponseCode] = code;
// }

// Get App response code
// export function GetAppResponseCode(request: Request): number {
//     return request.headers[ContextKey.AppResponseCode] as number;
// }

// Set device type
export function SetDeviceType(request: Request, deviceType: string) {
    request.headers[ContextKey.DeviceType] = deviceType;
}

// Get device type
export function GetDeviceType(request: Request): string {
    return request.headers[ContextKey.DeviceType] as string;
}

// Set app error message
export function SetAppErrorMessage(request: Request, message: string) {
    request.headers[ContextKey.AppErrorMessage] = message;
}

// Get App error message
export function GetAppErrorMessage(request: Request): string {
    return request.headers[ContextKey.AppErrorMessage] as string;
}

// Set cache control
export function SetCacheControl(request: Request, cacheControl: string) {
    request.headers[ContextKey.CacheControl] = cacheControl;
}

// Get cache control
export function GetCacheControl(request: Request): string {
    return request.headers[ContextKey.CacheControl] as string;
}

// Set event name
export function SetEventName(request: Request, eventName: string) {
    request.headers[ContextKey.EventName] = eventName;
}

// Get event name
export function GetEventName(request: Request): string {
    return request.headers[ContextKey.EventName] as string;
}

// Set event description
export function SetEventDescription(request: Request, eventDescription: string) {
    request.headers[ContextKey.EventDescription] = eventDescription;
}

// Get event description
export function GetEventDescription(request: Request): string {
    return request.headers[ContextKey.EventDescription] as string;
}

// Set request body
export function SetRequestBody(request: Request, body: any) {
    request.headers[ContextKey.RequestBody] = body;
}

// Get request body
export function GetRequestBody(request: Request): any {
    return request.headers[ContextKey.RequestBody] as any;
}

// Set request uri
export function SetRequestUri(request: Request, uri: string) {
    request.headers[ContextKey.RequestURI] = uri;
}

// Get Request uri
export function GetRequestUri(request: Request): string {
    return request.headers[ContextKey.RequestURI] as string;
}

// Set request method
export function SetRequestMethod(request: Request, method: string) {
    request.headers[ContextKey.RequestMethod] = method;
}

// Get Request method
export function GetRequestMethod(request: Request): string {
    return request.headers[ContextKey.RequestMethod] as string;
}

// Set client ip
export function SetClientIP(request: Request, ip: string) {
    request.headers[ContextKey.ClientIP] = ip;
}

// Get client ip
export function GetClientIP(request: Request): string {
    return request.headers[ContextKey.ClientIP] as string;
}

// Set response http code
// export function SetResponseHttpCode(request: Request, code: number) {
//     request.headers[ContextKey.ResponseHttpCode] = code;
// }

// Get response http code
// export function GetResponseHttpCode(request: Request): number {
//     return request.headers[ContextKey.ResponseHttpCode] as number;
// }


// Set auth token
export function SetAuthToken(request: Request, token: string) {
    request.headers[ContextKey.AuthToken] = token;
}

// Get auth token
export function GetAuthToken(request: Request): string {
    return request.headers[ContextKey.AuthToken] as string;
}

// Set service name
export function SetServiceName(request: Request, name: string) {
    request.headers[ContextKey.ServiceName] = name;
}

// Get service name
export function GetServiceName(request: Request): string {
    return request.headers[ContextKey.ServiceName] as string;
}
