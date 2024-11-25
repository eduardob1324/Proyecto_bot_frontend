import { Program } from "./Program";

export interface Generation {
    id?:string,
    name:String,
    program:{
        id:number,
        name?:string
    }
}
