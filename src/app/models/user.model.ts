export class User {

    constructor(
        public _id: number,
        public name: string,
        public nickname: string,
        public email: string,
        public password: string,
        public image: string,
        public role: any,
        public status: boolean,
        public google: boolean,
        public createdAt: any,
        public updatedAt: any,
    ){}

}