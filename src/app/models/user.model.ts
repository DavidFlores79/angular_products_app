export class User {

    constructor(
        public _id: number,
        public name: string,
        public email: string,
        public image: string,
        public role: string,
        public status: boolean,
        public google: boolean,
        public createdAt: any,
        public updatedAt: any,
    ){}

}