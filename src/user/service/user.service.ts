/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entity/user.entity';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getUser(payload: JwtPayload) {
        const { email } = payload;
        const user: User = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return undefined
        }
        return user;
    }

    async createUser(params: CreateUserDto) {
        const user = new User()
        user.avatar = params.avatar;
        user.email = params.email;
        user.username = params.username;
        return this.userRepository.save(user)
    }

    async updateUser(params: UpdateUserDto) {
        const currentUser = await this.userRepository.findOne({ where: { id: params.id } })
        if (!currentUser) return undefined

        if (!!params.username) {
            currentUser.username = params.username
        }

        if (!!params.avatar) {
            currentUser.avatar = params.avatar
        }

        if (!!params.email) {
            currentUser.email = params.email
        }

        if (!!params.isOnboarding) {
            currentUser.isOnboarding = params.isOnboarding
        }

        currentUser.isEnable2fa = params.isEnable2fa
        await this.userRepository.save(currentUser)

        return currentUser
    }

}