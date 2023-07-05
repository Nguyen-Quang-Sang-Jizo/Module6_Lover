import { Otp } from "../entity/Otp";
import bcrypt from  "bcrypt"
import {AppDataSource} from "../ormconfig";



class EmailService{
    private emailRepository;
    constructor() {
        this.emailRepository = AppDataSource.getRepository(Otp)
    }
    save = async (mail, otp, date) => {
        let email = await mail.owner
        mail.owner = email;
        mail.otpValue = otp;
        mail.otpExpireAt = date;
        return await this.emailRepository.save(mail);
    }
    
}
export default new EmailService()
