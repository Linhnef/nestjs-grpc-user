/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true, nullable: false })
    public email: string;

    @Column({ nullable: true })
    public avatar: string;

    @Column({ nullable: true })
    public username: string;

    @Column({ default: false })
    public isEnable2fa: boolean;

    @Column({ default: false })
    public isOnboarding: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}

export default User;