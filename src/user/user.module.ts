/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import User from './entity/user.entity';
import { AuthenticationController } from './controller/user.controller';
import { JwtStategy } from './service/jwt.stategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            }
        }),
        TypeOrmModule.forFeature([User]),
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.GRPC,
                options: {
                    package: 'auth',
                    protoPath: join(process.cwd(), 'dist/protos/rpc/auth.proto'),
                    url: process.env.AUTH_GRPC_CONNECTION_URL
                },
            },
        ]),
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.GRPC,
                options: {
                    package: 'user',
                    protoPath: join(process.cwd(), 'dist/protos/rpc/user.proto'),
                    url: process.env.USER_GRPC_CONNECTION_URL
                },
            },
        ])
    ],
    controllers: [AuthenticationController],
    providers: [UserService, JwtStategy],
    exports: [PassportModule, JwtStategy]
})
export class AuthenticationModule { }