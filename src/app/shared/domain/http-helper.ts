import { Response } from "express";

export interface HttpResponse{
    success: boolean;
    data?: any;
    error?: any;
}

export function ok(res: Response, data: HttpResponse) {
    return res.status(200).json(data);
}

export function badRequest(res: Response, data: HttpResponse) {
    return res.status(400).json(data);
}

export function unauthorized(res: Response, data: HttpResponse){
    return res.status(401).json(data)
}