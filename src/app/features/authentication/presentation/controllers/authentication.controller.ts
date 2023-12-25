import { Request, Response } from "express";
import { LoginUseCase } from "../../usecases";
import { CustomError, ok, unauthorized } from "../../../../shared/domain";

export class AuthenticantionController {
    async login(req: Request, res: Response) {
        try{
            const {email, password} = req.body;
            const useCase = new LoginUseCase();
            const data = await useCase.execute({email, password});
            return ok(res, {
                success: true,
                data
            });
        }catch (error: any) {
            if (error instanceof CustomError) {
                return unauthorized(res, { success: false, error: error.message });
            }
            throw error;
        }
    }
}