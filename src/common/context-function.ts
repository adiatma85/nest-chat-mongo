// This is the file that contain functions to add context keys to our request object
import { ExecutionContext } from '@nestjs/common';
import { ContextKey } from './context-key';
import { LanguageEnum } from './language';
import { v4 as uuidv4 } from 'uuid';


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

// Set Request id
export function SetRequestId(executionContext: ExecutionContext) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.RequestId] = uuidv4();

    return executionContext;
}

// Get Request id
export function GetRequestId(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.RequestId] as string;
}

// Set service version
export function SetServiceVersion(executionContext: ExecutionContext, version: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.ServiceVersion] = version;

    return executionContext;
}

// Get service version
export function GetServiceVersion(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.ServiceVersion] as string;
}

// Set user id
export function SetUserId(executionContext: ExecutionContext, userId: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.UserId] = userId;

    return executionContext;
}

// Set user agent
export function SetUserAgent(executionContext: ExecutionContext, userAgent: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.UserAgent] = userAgent;

    return executionContext;
}

// Get User agent
export function GetUserAgent(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.UserAgent] as string;
}

// Get user id
export function GetUserId(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.UserId] as string;
}

// Set request start time
export function SetRequestStartTime(executionContext: ExecutionContext, time: number) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.RequestStartTime] = time;

    return executionContext;
}

// Get request start time
export function GetRequestStartTime(executionContext: ExecutionContext): number {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.RequestStartTime] as number;
}

// Set app responce code
export function SetAppResponseCode(executionContext: ExecutionContext, code: number) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.AppResponseCode] = code;

    return executionContext;
}

// Get App response code
export function GetAppResponseCode(executionContext: ExecutionContext): number {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.AppResponseCode] as number;
}

// Set device type
export function SetDeviceType(executionContext: ExecutionContext, deviceType: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.DeviceType] = deviceType;

    return executionContext;
}

// Get device type
export function GetDeviceType(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.DeviceType] as string;
}

// Set app error message
export function SetAppErrorMessage(executionContext: ExecutionContext, message: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.AppErrorMessage] = message;

    return executionContext;
}

// Get App error message
export function GetAppErrorMessage(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.AppErrorMessage] as string;
}

// Set cache control
export function SetCacheControl(executionContext: ExecutionContext, cacheControl: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.CacheControl] = cacheControl;

    return executionContext;
}

// Get cache control
export function GetCacheControl(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.CacheControl] as string;
}

// Set event name
export function SetEventName(executionContext: ExecutionContext, eventName: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.EventName] = eventName;

    return executionContext;
}

// Get event name
export function GetEventName(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.EventName] as string;
}

// Set event description
export function SetEventDescription(executionContext: ExecutionContext, eventDescription: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.EventDescription] = eventDescription;

    return executionContext;
}

// Get event description
export function GetEventDescription(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.EventDescription] as string;
}

// Set request body
export function SetRequestBody(executionContext: ExecutionContext, body: any) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.RequestBody] = body;

    return executionContext;
}

// Get request body
export function GetRequestBody(executionContext: ExecutionContext): any {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.RequestBody] as any;
}

// Set request uri
export function SetRequestUri(executionContext: ExecutionContext, uri: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.RequestURI] = uri;

    return executionContext;
}

// Get Request uri
export function GetRequestUri(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.RequestURI] as string;
}

// Set request method
export function SetRequestMethod(executionContext: ExecutionContext, method: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.RequestMethod] = method;

    return executionContext;
}

// Get Request method
export function GetRequestMethod(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.RequestMethod] as string;
}

// Set client ip
export function SetClientIP(executionContext: ExecutionContext, ip: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.ClientIP] = ip;

    return executionContext;
}

// Get client ip
export function GetClientIP(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.ClientIP] as string;
}

// Set response http code
export function SetResponseHttpCode(executionContext: ExecutionContext, code: number) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.ResponseHttpCode] = code;

    return executionContext;
}

// Get response http code
export function GetResponseHttpCode(executionContext: ExecutionContext): number {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.ResponseHttpCode] as number;
}


// Set auth token
export function SetAuthToken(executionContext: ExecutionContext, token: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.AuthToken] = token;

    return executionContext;
}

// Get auth token
export function GetAuthToken(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.AuthToken] as string;
}

// Set service name
export function SetServiceName(executionContext: ExecutionContext, name: string) {
    var request = executionContext.switchToHttp().getRequest();
    request.headers[ContextKey.ServiceName] = name;

    return executionContext;
}

// Get service name
export function GetServiceName(executionContext: ExecutionContext): string {
    var request = executionContext.switchToHttp().getRequest();
    return request.headers[ContextKey.ServiceName] as string;
}
