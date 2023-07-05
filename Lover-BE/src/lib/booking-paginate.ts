import {Paginate} from "./paginate";
import {User} from "../entity/User";
import {Provider} from "../entity/Provider";

export class BookingPaginate{
    id: number;
    address: string;
    hour: string;
    startTime: Date;
    status: string;
    cost: string;
    user: User;
    providers: Provider

    constructor(entity: any) {
        this.startTime = entity.startTime
        this.status = entity.status
        this.cost = entity.cost
    }
}

export class BookingListPaginated extends Paginate(BookingPaginate) {
}