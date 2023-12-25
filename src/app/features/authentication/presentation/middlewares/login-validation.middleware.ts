import { NextFunction, Request, Response } from "express";
import { badRequest } from "../../../../shared/domain";
import { ZodError, z } from "zod";

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
    const scheme = z.object({
        email: z.string().email(),
        password: z.string().min(1).max(100),
    });
    
    try{
        const data = scheme.parse(req.body);
        Object.assign(req.body, data);
        return next();
    } catch (error: any){
        if (error instanceof ZodError) {
        return badRequest(res, {
            success: false,
            error: error.issues.map((issue) => ({
                campo: issue.path[0],
                mensagem: issue.message,
                codigo: issue.code,
            })),
        });
    }
    throw error;
    }
}