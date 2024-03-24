import { GenderEnum } from "@/enums"
import { ILoyaltyTag } from "./loyaltyTag.model"

export interface ILoyaltyMember {
    id?: string
    phone?: string
    emails?: string[]
    birthday?: Date | null
    gender?: GenderEnum
    first_name?: string
    last_name?: string
    nick_name?: string
    address?: string
    image?: string
    last_active?: Date | null
    member_code?: string
    channel?: string
    wallet?: ILoyaltyMemberWallet
    memberTags?: ILoyaltyMemberTag[]
}

export interface ILoyaltyMemberForm {
    birthday?: Date | null
    gender?: GenderEnum
    first_name?: string
    last_name?: string
    nick_name?: string
    address?: string
    image?: string
    emails?: string[]
    is_active?: boolean
    member_tags?: string[]
}

export interface ILoyaltyMemberWallet {
    id?: string
    point?: number
    is_active?: boolean
    active_from?: Date | null
    active_end?: Date | null
    description?: string
}

export interface ILoyaltyMemberTag extends ILoyaltyTag {
    type?: number
    is_active?: boolean
}
