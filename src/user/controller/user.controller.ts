/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Next, Post, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { config } from 'dotenv';
import { CreateUserRequest, UpdateUserRequest, User, UserServiceController, UserServiceControllerMethods } from '../service/grpc-user-service';
import { UserService } from '../service/user.service';
import { NOT_FOUND_USER_GRPC_RESULT } from 'src/constants/google.constant';

config();

@ApiTags('user')
@UserServiceControllerMethods()
@Controller()
export class AuthenticationController implements UserServiceController {
    constructor(private readonly userService: UserService) { }

    @GrpcMethod()
    async getUser(request: JwtPayload) {
        const currentUser = await this.userService.getUser(request)
        let user: User = { ...NOT_FOUND_USER_GRPC_RESULT }
        if (currentUser) {
            user = {
                ...currentUser,
                exited: true
            }
        }
        return user
    }

    @GrpcMethod()
    async createUser(request: CreateUserRequest) {
        const currentUser = await this.userService.createUser(request)
        let user: User = { ...NOT_FOUND_USER_GRPC_RESULT }
        if (currentUser) {
            user = {
                ...currentUser,
                exited: true
            }
        }
        return user
    }

    @GrpcMethod()
    async updateUser(request: UpdateUserRequest) {
        const currentUser = await this.userService.updateUser(request)
        let user: User = { ...NOT_FOUND_USER_GRPC_RESULT }
        if (currentUser) {
            user = {
                ...currentUser,
                exited: true
            }
        }
        return user
    }

    @UseGuards(AuthGuard('jwt'))
    welcome() {
        return 'welcome'
    }

}
