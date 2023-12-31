export interface UserDetailDTO {
    id: string;
    name: string;
    email: string;
    password?: string;
}

export interface NewUserDTO {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserDTO {
    id: string;
    name?: string;
    email?: string;
    password?: string;
}