import {Request, Response} from "express";
import providerService from "../service/ProviderService";
import userService from "../service/userService";
import imageService from "../service/imageService";
import { Provider } from "../entity/Provider";
import ServiceProviderService from "../service/ServiceProviderService";
import serviceService from "../service/serviceService";
const jwt = require('jsonwebtoken')

class ProviderController {
    save = async (req: Request, res: Response) => {
           let token = req.headers.authorization.split(' ')[1];
           const decodedToken = jwt.decode(token);
           let provider = req.body
            let newProvider = await providerService.save(provider, decodedToken.idUser)
            let image = provider.image
            let service = provider.service
    
           let newImage= await imageService.addImage(newProvider.id,image)
           let newSerrvice= await ServiceProviderService.addService(newProvider.id,service)

            res.status(200).json({
                success: true,
                data: newProvider
            })
    }


    all = async (req: Request, res: Response) => {
        try {
            const { page, take, keyword, sex, name, city, country } = req.query;
            const query = {
                page: parseInt(String(page), 10) || 1,
                take: parseInt(String(take), 10) || 15,
                keyword: keyword || '',
                sex: sex || '',
                name: name || '',
                city: city || '',
                country: country || ''
            };

            const allProvider = await providerService.all(query);
            res.status(200).json({
                data: allProvider
            });
        } catch (e) {
            res.status(500).json({
                message: 'Có lỗi hệ thống cmnr'
            });
        }
    }

    showOne = async (req: Request, res: Response) => {
        let id = req.params.id
        let oneProvider = await providerService.one(id)
        res.status(200).json(oneProvider)
    }
    showOneByIdUser = async (req: Request, res: Response) => {
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        let id = decodedToken.idUser
        let oneProvider = await providerService.oneByIdUser(id)
        res.status(200).json(oneProvider)
    }
    acceptUser = async (req: Request, res: Response) => {
        let id  = req.params.id
        const data = await providerService.accept(id)
        res.status(200).json({
            message: true,
            data: data
        })
    }
    rejectUser = async (req: Request, res: Response) => {
        let id  = req.params.id
        const data = await providerService.reject(id)
        res.status(200).json({
            message: true,
            data: data
        })
    }


    editProvider = async (req: Request, res: Response) => {
        let provider = req.body;
        console.log(req.body)

        const newProviders={
            name : provider.name,
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
            price: provider.price
        }
        let id = req.params.id;
        let img = provider.image
        let service = provider.service
        let newProvider = await providerService.update(id, newProviders)
        if (img !== undefined && img !== null) {
            await imageService.upDateImage(id, img)
          }
        if (service !== undefined && service !== null) {
            await ServiceProviderService.upDateService(id,service )
        }
        res.status(200).json({
            success: true,
            data: newProvider
        })
    }



    privateProvider = async (req: Request, res: Response) => {
        let providerId = req.params.id
        let isPrivate = await providerService.private(providerId)
        res.status(200).json({
            message: 'chưa sẵn sàng',
            data: isPrivate
        })
    }
    publicProvider = async (req: Request, res: Response) => {
        let providerId = req.params.id
        let isPublic = await providerService.public(providerId)
        res.status(200).json({
            message: 'đang sẵn sàng',
            data: isPublic
        })
    }
    forRentProvider = async (req: Request, res: Response) => {
        let providerId = req.params.id
        let isPublic = await providerService.forRent(providerId)
        res.status(200).json({
            message: 'đang cho thuê',
            data: isPublic
        })
    }
    increaseCounts=async (req: Request, res: Response)=> {
        const id = req.params.id 
        let data= await providerService.increaseCount(id);
        res.status(200).json({
            data: data
        })
      }

    getTopProviders = async (req: Request, res: Response) => {
        const { page, take } = req.query;

        const q = {
            page: parseInt(String(page), 10) || 1,
            take: parseInt(String(take), 10) || 15,
            sex: 'all',
        };
        console.log(q)

        const data = await providerService.getTopProviders(q);
        console.log(data)

        res.status(200).json({
            data: data,
        });
    };
    getTopSixProviders=async (req: Request, res: Response)=> {
        let data= await providerService.getTopSixProviders();
        res.status(200).json({
            data: data
        })
    }

    getNewlyJoinedProviders = async (req: Request, res: Response) => {
        const { page, take } = req.query;
        const q = {
            page: parseInt(String(page), 10) || 1,
            take: parseInt(String(take), 10) || 15,
        };

        const data = await providerService.getNewlyJoinedProviders(q);
        res.status(200).json({
            data: data,
        });
    };
}

export default new ProviderController()
