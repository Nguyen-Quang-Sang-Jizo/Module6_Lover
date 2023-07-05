import {AppDataSource} from "../ormconfig";
import {Booking} from "../entity/Booking";
import {Provider} from "../entity/Provider";
import {LessThanOrEqual, Not} from "typeorm";

class BookingService {
    private bookingRepository
    private providerRepository

    constructor() {
        this.bookingRepository = AppDataSource.getRepository(Booking)
        this.providerRepository = AppDataSource.getRepository(Provider)
    }

    save = async (idProvider, req, cost) => {
        let user = req['user'].id
        let booking = {
            address: req.body.address,
            hour: req.body.hour,
            startTime: req.body.startTime,
            cost: cost,
            user: user,
            providers: idProvider,
        }

        return await this.bookingRepository.save(booking)
    }
    all = async () => {
        return await this.bookingRepository.find()
    }
    detail = async (id, idUser) => {
        return await this.bookingRepository.findOne({
            where: {
                id: id,
                user: {
                    id: idUser
                }
            },
            relations: {
                providers: true,
            }
        })
    }
    find = async (text, idUser) => {
        return await this.bookingRepository.find({
            where: {
                status: text,
                user: {
                    id: idUser
                }
            }

        })
    }


    findUser = async (idUser) => {
        return await this.bookingRepository.find({
            where: {
                user: {
                    id: idUser
                }
            },
            relations: {
            user: true,
                providers: true,
        }

        })
    }


    findProvider = async (text, loggedInUserId) => {
        const query = this.bookingRepository
            .createQueryBuilder("booking")
            .leftJoinAndSelect("booking.providers", "provider")
            .leftJoinAndSelect("booking.user", "user")
            .where("booking.status = :status", {status: text})
            .andWhere("provider.id = :idProvider", {idProvider: loggedInUserId})
            .getMany();

        return await query;
    };


    findALlProvider = async (loggedInUserId) => {
        const query = this.bookingRepository
            .createQueryBuilder("booking")
            .leftJoinAndSelect("booking.providers", "provider")
            .leftJoinAndSelect("booking.user", "user")
            .where("provider.id = :idProvider", { idProvider: loggedInUserId })
            .getMany();

        return await query;
    };


    detailProvider = async (id, idProvider) => {
        return await this.bookingRepository.findOne({
            where: {
                id: id,
                providers: {
                    id: idProvider
                }
            },
            relations: {
                user: true,
            }
        })
    }

    delete = async (id) => {
        await this.bookingRepository.delete({id: id})
    }


    reject = async (bookingId, idProvider) => {
        const booking = await this.bookingRepository.findOne({
            where: {
                id: bookingId,
                providers: idProvider
            }
        });
        if (!booking) {
            throw new Error("Booking not found");
        }

        if (booking.status !== "pending") {
            throw new Error("Booking is not in pending status");
        }

        booking.status = "reject";
        return await this.bookingRepository.save(booking);
    }



    acceptBooking = async (bookingId, idProvider) => {
        const booking = await this.bookingRepository.findOne({
            where: {
                id: bookingId,
                providers: {id: idProvider}
            },
            relations: ["user", "providers"]
        });

        if (!booking) {
            throw new Error("Booking not found");
        }

        if (booking.status !== "pending") {
            throw new Error("Booking is not in pending status");
        }

        const endTime = new Date(booking.startTime.getTime() + booking.hour * 60 * 60 * 1000);

        const overlappingBookings = await this.bookingRepository.find({
            where: {
                id: Not(booking.id),
                providers: idProvider,
                status: "pending",
                startTime: LessThanOrEqual(endTime),
            }
        });

        if (overlappingBookings.length > 0) {
            await Promise.all(
                overlappingBookings.map(async (b) => {
                    b.status = "reject";
                    await this.bookingRepository.save(b);
                })
            );

            booking.status = "accept";
            return await this.bookingRepository.save(booking);
        } else {
            // If no overlapping bookings found, accept the booking directly
            booking.status = "accept";
            return await this.bookingRepository.save(booking);
        }
    }


    showOne = async (id) => {
        return await this.bookingRepository.findOne({
            where: {
                id: id
            },
            relations: ["user", "providers"]
        })
    }


    updateCountOnStatusChange = async (bookingId, providerId) => {
        const booking = await this.bookingRepository.findOne({
            where: {
                id: bookingId
            },
            relations: ["providers"]
        });

        if (booking && booking.status === 'accept') {
            const provider = await this.providerRepository.findOne({
                where: {
                    id: providerId
                }
            });

            if (provider) {
                provider.count = (parseInt(provider.count) + 1).toString();
                await this.providerRepository.save(provider);

                booking.status = 'done';
                await this.bookingRepository.save(booking);
            }
        }

        return booking;
    }
      totalCostByUserId= async (userId)=> {
        const bookingRepository = AppDataSource.getRepository(Booking);
        const bookings = await bookingRepository.find({ where: { user: userId } });
      
        let totalCost = 0;
        for (const booking of bookings) {
            totalCost += parseFloat(booking.cost);
          }
        return totalCost;
      }
      
      totalCostByProviderId= async ( providerId)=> {
        const bookingRepository = await AppDataSource.getRepository(Booking);
        const bookings = await bookingRepository.find({ 
            where:
             {
                providers: providerId
            }
             });
        let totalCost = 0;
      
        for (const booking of bookings) {
            totalCost += parseFloat(booking.cost);
          }
          
        return totalCost;
      }

}

export default new BookingService()