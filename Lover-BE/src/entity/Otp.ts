import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('otps')
export class Otp {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
    id: string;

    @Column({ length: 6, nullable: true })
    otpValue: string;

    @Column({ nullable: true })
    otpExpireAt: Date;

    @Column({ select: false })
    owner: string;
}