export class PageRequestDto {
    readonly page: number = 1;
    take: number = 15;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
    readonly keyword?: string;
    readonly code?: string;
}

interface IPageMetaDto {
    options: PageRequestDto;
    total: number;
}
export interface IPaginated<T> {
    docs: T[];
    meta: PageMeta
}

export interface IPaginated<T> {
    docs: T[];
    meta: PageMeta | null; // Thêm kiểu dữ liệu `null`
}

export class PageMeta {
    readonly page: number;
    readonly take: number;
    readonly total: number;
    readonly totalPage: number;''
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;

    constructor({ options, total }: IPageMetaDto) {
        this.page = options.page;
        this.take = 15;
        this.total = total;
        this.totalPage = Math.ceil(total / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.totalPage;

        if (this.total < this.take) {
            this.totalPage = 1;
        } else {
            const remainingItems = this.total % this.take;
            if (remainingItems > 0) {

            }
        }
    }
}

    export function Paginate<T>(classRef){
    class Pagination implements IPaginated<T> {
        docs: T[];
        meta: PageMeta;

        constructor(data: T[], meta: PageMeta) {
            this.docs = data;
            this.meta = meta;
        }
    }

    return Pagination;
}
