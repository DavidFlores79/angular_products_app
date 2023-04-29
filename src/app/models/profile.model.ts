import { Category } from './category.model';
import { Module } from './module.model';
import { Role } from './role.model';
export class Profile {

    constructor(
        public _id: number,
        public module: Module,
        public permissions: any,
        public role: Role,
        public createdAt: any,
        public updatedAt: any,
    ){}

}