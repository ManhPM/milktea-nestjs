import { Request } from 'express';
export declare class MessageService {
    private readonly request;
    constructor(request: Request);
    getMessage(messageCode: any): Promise<any>;
}
export declare function convertPhoneNumber(phoneNumber: any): any;
export declare function isNumberic(phone: any): boolean;
export declare function isValidDate(value: any): boolean;
export declare function deg2rad(num: number): number;
export declare function isPositiveNum(num: number): boolean;
export declare function isBit(num: number): boolean;
export declare function calDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
export declare function isLatitude(lat: any): boolean;
export declare function isLongitude(lng: any): boolean;
export declare function isDateGreaterThanNow(dateString: any): boolean;
export declare function isLessThan15Years(date1: any, date2: any): boolean;
