import { ILike } from "typeorm";
import { AppdataSource } from "../../../shared/infra/db/data-source";
import { UserEntity } from "../../../shared/infra/db/entities";
import { NewUserDTO, UserDetailDTO } from "../dto";
import { randomUUID } from "crypto";

type GetUserByEmailOptions = {
    withPassword: boolean;
};

export class UserRepository{
    private _repository = AppdataSource.getRepository(UserEntity);

    private mapEntity(entity: UserEntity){
        return{
            id: entity.id,
            name: entity.name,
            email: entity.email,
            password: entity.password
        }
    }

    async saveUser(user: NewUserDTO): Promise<boolean>{

        const UserEntity = this._repository.create({
            id: randomUUID(),
            name: user.name,
            email: user.email,
            password: user.password
        });

        await this._repository.save(UserEntity);

        return true;
    }

    async verifyEmail(email: string): Promise<boolean>{
        const exist = await this._repository.manager.exists(UserEntity, {
            where: {
                email,
            }
        })

        return exist;
    }

    async getAllUsers(name?: string): Promise<UserDetailDTO[]> {
        const usersEntity = await this._repository.manager.find(UserEntity, {
            where: {
                name: ILike(`%${name ?? ""}%`)
            }
        })

        const users = usersEntity.map<UserDetailDTO>(
            (user) => ({
            id: user.id,
            name: user.name,
            email: user.email
            })
        )

        return users;
    }  
    
    async getUserByEmail(email: string, options?: GetUserByEmailOptions): Promise<UserDetailDTO | null> {
        const user = await this._repository.manager.findOne(UserEntity, {
            where: {
                email,
            }
        });

        if (!user) {
            return null;
        }

        return user;
    }    
}