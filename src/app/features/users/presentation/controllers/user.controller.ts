import { Request, Response } from "express";
import { BCryptPassword } from "../../../../shared/adapters/crypto";
import { UserRepository } from "../../repository";
import { NewUserDTO, UpdateUserDTO } from "../../dto";
import { ok } from "../../../../shared/domain";

export class UserController {
    async createUser(req: Request, res: Response){
        const {name, email, password} = req.body;

        const bcrypt = new BCryptPassword();
        const repository = new UserRepository();

        const hashPassword = await bcrypt.hashPassword(password);

        const newUser: NewUserDTO = {
            name,
            email,
            password: hashPassword
        }

        await repository.saveUser(newUser);

        return ok(res, { success: true });
    }

    async updateUser(req: Request, res: Response){
        const {id, name, email, password} = req.body;

        const bcrypt = new BCryptPassword();
        const repository = new UserRepository();


        const userUpdate: UpdateUserDTO = {
            id,
            name,
            email
        };


        if(password){
            const hashPassword = await bcrypt.hashPassword(password);

            userUpdate.password = hashPassword;
        }
        
        await repository.userUpdate(userUpdate);

        return ok(res, { success: true });
    }
}