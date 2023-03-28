export class Product {

    constructor(
        public _id: number,
        public name: string,
        public price: number,
        public available: boolean,
        public status: boolean,
        public user_id: Object,
        public category: number,
        public image: string,
        public createdAt: any,
        public updatedAt: any,
    ){}

}