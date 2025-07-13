export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    avatarUri?: string;
    bio?: string;
}
export interface UserInfo {
    name: string
    email: string,
    password: string,
    phone: string,
    avatarUri?: string,
    bio?: string,
}
export interface signInProps {
    email: string,
    password: string,
}