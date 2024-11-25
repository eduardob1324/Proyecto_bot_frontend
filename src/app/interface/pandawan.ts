export interface Pandawan {
    id?: number,
    name: string,
    discordUser: string,
    email: string,
    phoneNumber: string,
    dateBirth: string,
    gender: string,
    generation: {
        id: number,
        name?:string
    },
    speciality?: {
        id?:number
        name?:string
    },
    programEmail?: string,
    
}
