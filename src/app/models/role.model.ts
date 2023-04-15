export class Role {

    constructor(
        public _id: number,
        public name: string,
        public modules: any,
        public status: boolean,
        public deleted: boolean,
        public createdAt: any,
        public updatedAt: any,
    ){}

}