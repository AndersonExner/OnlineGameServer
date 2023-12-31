import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../repository";
import { badRequest } from "../../../../shared/domain";
import { ZodError, z } from "zod";

function defineBaseSchema(body: Request){
    const baseSchema = z.object({
        id: z.string().min(2),
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
    });

    return baseSchema;
}

export const updateUserValidator = async (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;
    const {id, name, email, password} = body;

    const repository = new UserRepository();

    const validID = await repository.verifyID(id);

    if (!validID) return badRequest(res, { success: false, error: 'ID Not Found' })

    const schema = defineBaseSchema(body);

    try{
        const data = schema.parse(body);
        Object.assign(
            req.body,
            data
        );
        return next();

    } catch (error: any) {

        if (error instanceof ZodError) {
        return badRequest(res, {
            success: false,
            error: error.issues.map((issue) => ({
            campo: issue.path[0],
            mensagem: issue.message,
            codigo: issue.code
            }))
        })
        }
        throw error;
    }    
}