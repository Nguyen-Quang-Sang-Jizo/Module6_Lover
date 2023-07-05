import {AppDataSource} from "../ormconfig";
import {User} from "../entity/User";
import bcrypt from  "bcrypt"
import jwt from "jsonwebtoken";
import { Like } from "typeorm";
import {Role} from "../entity/Role";
import {PageMeta} from "../lib/paginate";
import {ProviderListPaginated, ProviderPaginate} from "../lib/provider-paginate";
import {Booking} from "../entity/Booking";
class UserService{
    private userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }
    save = async (user) => {
        let password = await bcrypt.hash(user.password, 10)
        user.password = password;
        user.role = 1
        await this.userRepository.save(user);
    }
    loginCheck = async (user) => {
        let userFind = await this.userRepository.findOne({
            relations: {
                role: true
            },
            where: {
                username: user.username
            }
        });
        if(!userFind){
            return 'User is not exist'
        }else {
            let passWordCompare = await bcrypt.compare(user.password, userFind.password);
            if(passWordCompare){
                if (userFind.isLocked) {
                    return {
                        isLocked: true
                    }
                }
                let payload = {
                    idUser: userFind.id,
                    username: userFind.username,
                    role: userFind.role,
                    isLocked: userFind.isLocked
                }
                let token = await (jwt.sign(payload, process.env.SECRET_OR_KEY, {
                    expiresIn: 3600000 * 10 * 100000
                }))
                payload['token'] = token
                return payload;
            }else {
                return 'Password is wrong'
            }
        }
    }
    findOne = async (userId) => {
        let userFind = await this.userRepository.findOne({
            relations: {

                role: true
            },
            where: {
                id: userId
            }
        })
        return userFind
    }
    checkUserSignup = async (user) => {
        let userFind = await this.userRepository.findOne({
            where: {
                username: user.username,
                // password: user.password
            }
        });
        return userFind;
    }
    all = async (q) => {
        const sql = this.userRepository
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.role', 'r')
            // .orderBy('a.createdAt', 'DESC')
            .take(q.take ? q.take : 10)
            .skip(q.skip ? q.skip : 0);

        //search keyword
        if (q.keyword) {
            sql.andWhere(
                `(
        a.name like :keyword
        OR a.city like :keyword
      )`,
                {keyword: `%${q.keyword}%`},
            );
        }

        //search giới tính
        if (q.sex) {
            sql.andWhere(
                `(a.sex  like :sex)`, {sex: `${q.sex}`}
            )
        }

        if (q.role) {
            sql.andWhere(`(r.name like :role)`, {
                role: `%${q.role}%`,
            });
        }


        const [entities, total] = await sql.getManyAndCount();

        // tính  bản ghi
        const meta = new PageMeta({options: q, total});

        //phân trang và chuẩn hoá dữ liệu đầu ra
        return new ProviderListPaginated(entities.map((c) => {return c}), meta)
    }

    update = async (id, user) => {
        await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                username: user.username,
                password: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                address: user.address,
                phoneNumber: user.phoneNumber,
                numberCard: user.numberCard,
                avatar:user.avatar,
                update: user.update,
                email: user.email,
                afterImageCard: user.afterImageCard,
                beforeImageCard: user.beforeImageCard


            })
            .where("id = :id", { id: id })
            .execute();

        const updatedUser = await this.userRepository
            .createQueryBuilder("user")
            .where("user.id = :id", { id: id })
            .getOne();

        return updatedUser;
    };




    updateRole = async (id) => {
        await this.userRepository.update({id: id}, {role: 3});
    }
    lock =  async (id) => {
        let isLock = 1
        await this.userRepository.update({id: id}, {isLocked: isLock})
    }


    open =  async (id) => {
        let isLock = 0
        await this.userRepository.update({id: id}, {isLocked: isLock});
    }
    delete = async (id) => {
        await this.userRepository.delete({id: id})
    }
    adminSearchUsername = async (username) => {
        try {
            let searchPeople = await this.userRepository.find({
                where: {
                    username: Like(`%${username}%`),
                    role: 'user'
                }
            });
            return searchPeople;
        } catch (error) {
            throw error;
        }
    }
    checkMail = async (owner: string) => {
        const findMail = await this.userRepository.findOne({ where: { email: owner } });
        return !findMail; // Trả về true nếu không tìm thấy otp có owner trùng
      };
    allBooking = async (req) => {
        let user = req['user'].id
        let bookings = await AppDataSource.getRepository(Booking).find({
            relations: {
                providers: true
            },
            select: {
                providers: {
                    name: true
                }
            },
            where: {
                user: {
                    id: user
                }
            }
        })

        return bookings
    }

    detailBooking = async (id, req) => {
        let user = req['user'].id
        let booking = await AppDataSource.getRepository(Booking).find({
            relations: {
                providers: {
                    serviceProviders: {
                        service: true
                    }
                },
            },
            select: {
                providers: {
                    name: true
                }
            },
            where: {
                id: id,
                user: {
                    id: user
                }
            }
        })

        return booking
    }

}
export default new UserService()
