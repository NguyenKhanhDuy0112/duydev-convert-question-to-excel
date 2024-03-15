import { GenderEnum } from "@/enums"

export interface ILoyaltyMember {
    id?: string
    phone?: string
    email?: string
    birthday?: string
    gender?: GenderEnum
    first_name?: string
    last_name?: string
    nick_name?: string
    address?: string
    image?: string
    channel?: string
}
