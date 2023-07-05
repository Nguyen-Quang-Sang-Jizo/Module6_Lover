import { Otp } from "../entity/Otp";
import { AppDataSource } from "../ormconfig";
import { addMinutes, isAfter, isBefore } from 'date-fns';
import * as nanoid from 'nanoid'
class OtpService {
    private readonly alphabet = '0123456789'
    private otpRepo
    constructor() {
        this.otpRepo = AppDataSource.getRepository(Otp)
    }

    async makeValue(){
        return nanoid.customAlphabet(this.alphabet, 6);
    }

    async makeOtp(owner:string){
        let otp = await this.otpRepo.findOneBy({owner})
        const value = await this.makeValue()
        const newOtp = {
            otpValue: value(),
            otpExpireAt: addMinutes(new Date(), 1),
            owner,
        };
        if (!otp) {
            await this.otpRepo.save(newOtp);
            return newOtp;
        }
        otp = Object.assign(otp, newOtp);
        await this.otpRepo.save(otp);

        return otp;
    }

    async getOtp(owner: string) {
        const otp = await this.makeOtp(owner);
        return otp.otpValue;
    }

    async verifyOtp(value: string, owner: string) {
        const qR = this.otpRepo.createQueryRunner();

        const otp = await qR.manager.findOne(Otp, {
            where: { owner },
        });


        if (!otp) {
            throw new Error('NotFoundOtp');
        }
        if (otp.otpValue !== value ) {
            const qb = this.otpRepo
                .createQueryBuilder('o')
                .update()
                .where({ id: otp.id })
            await qb.execute();

            throw new Error('INVALID_OTP_TRY_AGAIN');
        }

        if (isBefore(otp.otpExpireAt, new Date())) {
            throw new Error('OTP_HAS_EXPIRED');
        }

        await this.otpRepo.update(otp.id, {
            otpValue: null,
            otpExpireAt: null,
        });

        return true;
    }
    checkOtp = async (otpValue:string, owner: string)=>{
        const findOtp = await this.otpRepo.findOne(
            { where:
                    { otpValue,
                        owner
                    }
            });
        return !findOtp;
    }

}
export default new OtpService()