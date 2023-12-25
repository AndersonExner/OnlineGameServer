import { BCryptPassword } from "../../../shared/adapters/crypto";
import { JwtToken } from "../../../shared/adapters/jwt";
import { UserRepository } from "../../users/repository";
import { LoginDTO, LoginDetailDTO } from "../dto";

export class LoginUseCase {
    async execute(login: LoginDTO): Promise<LoginDetailDTO> {
        const repository = new UserRepository();
        const bcrypt = new BCryptPassword();

        const user = await repository.getUserByEmail(login.email, {
            withPassword: true
        });

        if(!user) throw new Error('Incorrect email ou password');

        const correctPassword = await bcrypt.comparePassword(
            login.password,
            user.password as string,
        );

        if(!correctPassword) throw new Error('Incorrect email ou password');

        const jwtToken = new JwtToken();

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const token = jwtToken.sign(userData);

        return{
            ...userData, token
        };
    }    
}