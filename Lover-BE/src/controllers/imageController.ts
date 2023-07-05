import imageService from "../service/imageService";
import {Request, Response} from "express";

class ImageController {
    private imageService

    constructor() {
        this.imageService = imageService
    }

    deleteImage = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            await this.imageService.deleteImageById(id)
            res.status(200).json('xoa thanh cong')
        } catch (e) {
            console.log("error in deleteInmage:", e)
            res.status(400).json({
                message: 'error in deleteInmage',
                success: false
            })
        }
    }

    deleteOne = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            await this.imageService.deleteOneImage(id)
            res.status(200).json('xoa thanh cong')
        } catch (e) {
            console.log("error in deleteOne:", e)
            res.status(400).json({
                message: 'error in deleteOne',
                success: false
            })
        }
    }
}

export default new ImageController();