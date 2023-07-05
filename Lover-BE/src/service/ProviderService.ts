import {AppDataSource} from "../ormconfig";
import {Provider} from "../entity/Provider";
import {PageMeta, Paginate} from "../lib/paginate";
import {ProviderListPaginated, ProviderPaginate} from "../lib/provider-paginate";
import {Image} from "../entity/Image";
import {Booking} from "../entity/Booking";
import {tr} from "date-fns/locale";

class ProviderService {
    private providerRepository

    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
    }

// những function như thế này là thừa không giải quyết vấn đề gì cả
    save = async (provider, user) => {
        const newProvider = {
            name: provider.name,
            dob: provider.dob,
            sex: provider.sex,
            city: provider.city,
            avatarProvider: provider.avatarProvider,
            country: provider.country,
            height: provider.height,
            weight: provider.weight,
            hobby: provider.hobby,
            desc: provider.desc,
            request: provider.request,
            linkFB: provider.linkFB,
            count: provider.count,
            images: provider.images,
            user: user,
            status: 1
            
        }
        let data = await this.providerRepository.save(newProvider);
        return data
    }


    all = async (q) => {
        const sql = this.providerRepository
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.user", "u")
            .leftJoinAndSelect("p.status", "s")
            .leftJoinAndSelect('p.images', 'images')
            .leftJoinAndSelect("p.serviceProviders", "sp")
            .leftJoinAndSelect("sp.service", "ser")
            .leftJoinAndSelect("ser.type", "type")
            .leftJoinAndSelect("p.evaluate", "eva")
            .take(q.take ? q.take : 15)
            .skip((q.page - 1) * q.take);

        if (q.keyword) {
            sql.andWhere(`(
            p.name like :keyword
            OR p.city like :keyword
          )`, {keyword: `%${q.keyword}%`});
        }

        if (q.sex) {
            sql.andWhere(`(p.sex like :sex)`, {sex: `${q.sex}`});
        }
        if (q.name) {
            sql.andWhere(`(p.name like :name)`, {name: `%${q.name}%`});
        }
        if (q.city) {
            sql.andWhere(`(p.city like :city)`, {city: `${q.city}`});
        }
        if (q.country) {
            sql.andWhere(`(p.country like :country)`, {country: `${q.country}`});
        }
        const [entities, total] = await sql.getManyAndCount();

        const meta = new PageMeta({options: q, total});

        return new ProviderListPaginated(entities.map((c) => new ProviderPaginate(c, c.user, c.images, c.serviceProviders, c.service, c.evaluate, c.type)), meta);
    }
//cái này có thể viết gọn hơn
    one = async (id) => {
        return await this.providerRepository.findOne({
            where: {id: id},
            relations: [ 'user','images', 'serviceProviders', 'serviceProviders.service', 'evaluate', 'serviceProviders.service.type'],
        });
    };
    //không ai viết ntn cả =))))), không tái sử dụng được
    searchByType = async (id) => {
        let provider = await this.providerRepository.find({
            where: {service: {id: id}},
            relations: {
                images: true,
                // service: true,
                user: true,
                status: true
            },
            select: {
                user: {
                    firstname: true,
                    lastname: true,
                    phoneNumber: true
                }
            }
        })
        return (provider);
    }
    oneByIdUser = async (id) => {
      return await this.providerRepository.findOne({
        where: { user:  {id: id} },
        relations: ['images', 'serviceProviders', 'serviceProviders.service', 'evaluate' ,'serviceProviders.service.type'],
      });
    };
    
    accept = async (id) => {
        return await AppDataSource.getRepository(Booking)
            .update({id: id}, {status: "accept"})
    }
    reject = async (id) => {
        return await AppDataSource.getRepository(Booking)
            .update({id: id}, {status: "reject"})
    }
    update = async (id, update) => {
        await this.providerRepository.update({id: id}, update)
    }
    private = async (id) => {
        await this.providerRepository.update({id: id}, {ready: 0})
        return {id, ready: 0}
    }
    public = async (id) => {
        await this.providerRepository.update({id}, {ready: 1});
        return {id, ready: 1}
    }
    forRent = async (id) => {
        await this.providerRepository.update({id}, {ready: 2});
        return {id, ready: 2}
    }
    increaseCount = async (providerId) => {
        const provider = await this.providerRepository.findOneBy({id: providerId});
        if (!provider) {
            throw new Error('Provider not found');
        }
        provider.count = await (parseInt(provider.count) + 1).toString();
        return (await this.providerRepository.save(provider));
    }

    getTopProviders = async (q) => {
        const sexValues = ["male", "female"];

        const sql = this.providerRepository.createQueryBuilder("p")
            .where("p.sex IN (:...sexValues)", { sexValues })
            .orderBy("p.count", "DESC")
            .addOrderBy("p.sex", "ASC")
            .take(q.take ? q.take : 15)
            .skip((q.page - 1) * q.take);

        const [entities, total] = await sql.getManyAndCount();

        entities.sort((a, b) => b.count - a.count);

        const meta = new PageMeta({ options: q, total });

        return new ProviderListPaginated(entities.map((c) => new ProviderPaginate(c, c.user, c.images, c.serviceProviders, c.service, c.evaluate, c.type)), meta);
    }
    getTopSixProviders = async () => {
        const topSixProviders = await this.providerRepository.find({
            order: {
                count: 'DESC',
            },
            take: 6,
        });

        return topSixProviders;
    }

    getNewlyJoinedProviders = async (q) => {
        const sql = this.providerRepository.createQueryBuilder("p")
            .orderBy("p.joinDate", "DESC")
            .take(q.take ? q.take : 15)
            .skip((q.page - 1) * q.take);

        const [entities, total] = await sql.getManyAndCount();

        const meta = new PageMeta({ options: q, total });

        return new ProviderListPaginated(entities.map((c) => new ProviderPaginate(c, c.user, c.images, c.serviceProviders, c.service, c.evaluate, c.type)), meta);
    }

    findOneProvider = async (idUser) => {
        return this.providerRepository.findOne({
            where: {
                user:{
                    id: idUser
                }
            },
            relations: {
                user: true,
            }
        })
    }
}

export default new ProviderService()
