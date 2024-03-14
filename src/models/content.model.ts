import { ContentStatusEnum, LangCodeEnum, MasterCateEnum, RelEnum } from "@/enums"
import { IContentDetailList } from "./contentDetail.model"
import { IContentType } from "./contentType.model"

export interface IContent {
    id?: string
    name: string
    description: string
    image: string
    lang: string
    position?: number
    is_default: boolean
    is_active?: boolean
    type_id: string
    cate_type_id: string
    master_content_id?: string
    approve_by?: string
    deleted_by?: string
    type?: IContentType
    status?: ContentStatusEnum
    created_at?: Date | null
    updated_at?: Date | null
}

export interface IContentForm {
    items: IContent[]
    cate_type_id: string
    type_id: string
    status?: ContentStatusEnum
    master_type: MasterCateEnum
    master_content_id?: string
    rel?: RelEnum
}

export interface IContentItem {
    [LangCodeEnum.EN]?: IContent
    [LangCodeEnum.AF]?: IContent
    [LangCodeEnum.SQ]?: IContent
    [LangCodeEnum.AM]?: IContent
    [LangCodeEnum.AR]?: IContent
    [LangCodeEnum.HY]?: IContent
    [LangCodeEnum.AS]?: IContent
    [LangCodeEnum.AY]?: IContent
    [LangCodeEnum.AZ]?: IContent
    [LangCodeEnum.BA]?: IContent
    [LangCodeEnum.EU]?: IContent
    [LangCodeEnum.BN]?: IContent
    [LangCodeEnum.DZ]?: IContent
    [LangCodeEnum.BH]?: IContent
    [LangCodeEnum.BI]?: IContent
    [LangCodeEnum.BR]?: IContent
    [LangCodeEnum.BG]?: IContent
    [LangCodeEnum.MY]?: IContent
    [LangCodeEnum.BE]?: IContent
    [LangCodeEnum.KM]?: IContent
    [LangCodeEnum.CA]?: IContent
    [LangCodeEnum.ZH]?: IContent
    [LangCodeEnum.CO]?: IContent
    [LangCodeEnum.HR]?: IContent
    [LangCodeEnum.CS]?: IContent
    [LangCodeEnum.DA]?: IContent
    [LangCodeEnum.NL]?: IContent
    [LangCodeEnum.EO]?: IContent
    [LangCodeEnum.ET]?: IContent
    [LangCodeEnum.FO]?: IContent
    [LangCodeEnum.FA]?: IContent
    [LangCodeEnum.FI]?: IContent
    [LangCodeEnum.FR]?: IContent
    [LangCodeEnum.FY]?: IContent
    [LangCodeEnum.GD]?: IContent
    [LangCodeEnum.GL]?: IContent
    [LangCodeEnum.KA]?: IContent
    [LangCodeEnum.DE]?: IContent
    [LangCodeEnum.EL]?: IContent
    [LangCodeEnum.KL]?: IContent
    [LangCodeEnum.GN]?: IContent
    [LangCodeEnum.GU]?: IContent
    [LangCodeEnum.HA]?: IContent
    [LangCodeEnum.HE]?: IContent
    [LangCodeEnum.HI]?: IContent
    [LangCodeEnum.HU]?: IContent
    [LangCodeEnum.IS]?: IContent
    [LangCodeEnum.ID]?: IContent
    [LangCodeEnum.IA]?: IContent
    [LangCodeEnum.IE]?: IContent
    [LangCodeEnum.IU]?: IContent
    [LangCodeEnum.IK]?: IContent
    [LangCodeEnum.GA]?: IContent
    [LangCodeEnum.IT]?: IContent
    [LangCodeEnum.JA]?: IContent
    [LangCodeEnum.JV]?: IContent
    [LangCodeEnum.KN]?: IContent
    [LangCodeEnum.KS]?: IContent
    [LangCodeEnum.KK]?: IContent
    [LangCodeEnum.RW]?: IContent
    [LangCodeEnum.KY]?: IContent
    [LangCodeEnum.RN]?: IContent
    [LangCodeEnum.KO]?: IContent
    [LangCodeEnum.KU]?: IContent
    [LangCodeEnum.LO]?: IContent
    [LangCodeEnum.LA]?: IContent
    [LangCodeEnum.LV]?: IContent
    [LangCodeEnum.LT]?: IContent
    [LangCodeEnum.MK]?: IContent
    [LangCodeEnum.MG]?: IContent
    [LangCodeEnum.MS]?: IContent
    [LangCodeEnum.ML]?: IContent
    [LangCodeEnum.MT]?: IContent
    [LangCodeEnum.MI]?: IContent
    [LangCodeEnum.MR]?: IContent
    [LangCodeEnum.MO]?: IContent
    [LangCodeEnum.MN]?: IContent
    [LangCodeEnum.NA]?: IContent
    [LangCodeEnum.NE]?: IContent
    [LangCodeEnum.NO]?: IContent
    [LangCodeEnum.OC]?: IContent
    [LangCodeEnum.OR]?: IContent
    [LangCodeEnum.OM]?: IContent
    [LangCodeEnum.PS]?: IContent
    [LangCodeEnum.PL]?: IContent
    [LangCodeEnum.PT]?: IContent
    [LangCodeEnum.PA]?: IContent
    [LangCodeEnum.QU]?: IContent
    [LangCodeEnum.RM]?: IContent
    [LangCodeEnum.RO]?: IContent
    [LangCodeEnum.RU]?: IContent
    [LangCodeEnum.SM]?: IContent
    [LangCodeEnum.SG]?: IContent
    [LangCodeEnum.SA]?: IContent
    [LangCodeEnum.SR]?: IContent
    [LangCodeEnum.SH]?: IContent
    [LangCodeEnum.ST]?: IContent
    [LangCodeEnum.TN]?: IContent
    [LangCodeEnum.SN]?: IContent
    [LangCodeEnum.SD]?: IContent
    [LangCodeEnum.SI]?: IContent
    [LangCodeEnum.SS]?: IContent
    [LangCodeEnum.SK]?: IContent
    [LangCodeEnum.SL]?: IContent
    [LangCodeEnum.SO]?: IContent
    [LangCodeEnum.ES]?: IContent
    [LangCodeEnum.SU]?: IContent
    [LangCodeEnum.SW]?: IContent
    [LangCodeEnum.SV]?: IContent
    [LangCodeEnum.TL]?: IContent
    [LangCodeEnum.TG]?: IContent
    [LangCodeEnum.TA]?: IContent
    [LangCodeEnum.TT]?: IContent
    [LangCodeEnum.TE]?: IContent
    [LangCodeEnum.TH]?: IContent
    [LangCodeEnum.BO]?: IContent
    [LangCodeEnum.TI]?: IContent
    [LangCodeEnum.TO]?: IContent
    [LangCodeEnum.TS]?: IContent
    [LangCodeEnum.TR]?: IContent
    [LangCodeEnum.TK]?: IContent
    [LangCodeEnum.TW]?: IContent
    [LangCodeEnum.UK]?: IContent
    [LangCodeEnum.UR]?: IContent
    [LangCodeEnum.UZ]?: IContent
    [LangCodeEnum.VI]?: IContent
    [LangCodeEnum.VO]?: IContent
    [LangCodeEnum.CY]?: IContent
    [LangCodeEnum.WO]?: IContent
    [LangCodeEnum.XH]?: IContent
    [LangCodeEnum.YI]?: IContent
    [LangCodeEnum.ZU]?: IContent
    items?: IContentDetailList
}

export interface IContentList {
    [key: string]: IContentItem
}
