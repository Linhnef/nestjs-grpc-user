/* eslint-disable prettier/prettier */
export class UpdateUserDto {
    id: string;
    username?: string;
    avatar?: string;
    email?: string;
    isEnable2fa: boolean;
    isOnboarding: boolean;
}