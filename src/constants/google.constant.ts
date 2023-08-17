/* eslint-disable prettier/prettier */
import { User } from "src/user/service/grpc-user-service";

export const OAUTH_GOOGLE_URL_API =
    'https://www.googleapis.com/oauth2/v3/userinfo?access_token=';
export const NOT_FOUND_USER_GRPC_RESULT: User = {
    id: "",
    email: "",
    avatar: "",
    username: "",
    isEnable2fa: false,
    isOnboarding: false,
    exited: false
}