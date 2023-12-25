export interface UserDetailDTO {
    id: string;
    name: string;
    email: string;
    password?: string;
}

export interface NewUserDTO {
    id: string;
    name: string;
    email: string;
    password: string;
}