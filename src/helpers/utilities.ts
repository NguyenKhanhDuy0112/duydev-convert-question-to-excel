import moment from "moment"

//convert file to base64
export function getBase64(img: File, callback: (data: ArrayBuffer | string | null) => void) {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
}

export function formatCash(number: number) {
    if (!Number(number)) return "0.0"
    const DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1)
    const priceWithCommas = Number(number).toLocaleString()
    const arParts = String(priceWithCommas).split(DecimalSeparator)
    const intPart = arParts[0]
    let decPart = arParts.length > 1 ? arParts[1] : ""
    decPart = (decPart + "00").substr(0, 2)
    return intPart + DecimalSeparator + decPart
}

export const isLowerCase = (str: string) => {
    return str !== str.toUpperCase()
}

export const isUppercase = (str: string) => {
    return str !== str.toLowerCase()
}

export const checkSpecialCharacter = (str: string) => {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    return format.test(str)
}

export const checkValidEmail = (str: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
}

export const compareString = (str1: string, str2: string) => {
    return String(str1).toLowerCase().localeCompare(String(str2).toLowerCase())
}

export const convertTimestamp = (timestamp: number | string) => {
    const date = new Date(Number(timestamp) * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedDate = `${day}/${month}/${year}`
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`

    return `${formattedDate} ${formattedTime}`
}

export const padZero = (number: number): string => {
    if (number < 10) {
        return "0" + number
    }
    return number.toString()
}

export const formatNumber = (num: number) => {
    if (num < 10) {
        return "0" + num
    }
    return num
}

export const RegExp = {
    Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    PhoneNumber: /(0?3|0?5|0?7|0?8|0?9|0?1[2|6|8|9])+([0-9]{8})\b/,
}

export const formatPhoneNumberWithPrefix84 = (phoneNumber: string) => {
    // Remove any non-digit characters from the input
    let formatPhoneNumber = formatPhoneNumberMiss84(phoneNumber)
    phoneNumber = formatPhoneNumber?.replace(/\D/g, "")

    // If the number has 9 digits and the first digit is not '0', add '84' as the prefix
    if (formatPhoneNumber?.length === 9 && formatPhoneNumber?.charAt(0) !== "0") {
        formatPhoneNumber = "84" + formatPhoneNumber
    }

    // If the number starts with '0', remove the '0' and add '84' as the prefix
    if (formatPhoneNumber?.charAt(0) === "0") {
        formatPhoneNumber = "84" + formatPhoneNumber?.slice(1)
    }

    // Add "(+84)" to the formatted number
    formatPhoneNumber = formatPhoneNumber?.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "(+$1) $2 $3 $4")

    return formatPhoneNumber
}

export const formatPhoneNumberMiss84 = (phoneNumber: string) => {
    if (phoneNumber?.length === 9) {
        return `0${phoneNumber}`
    }
    return phoneNumber
}

export const generateGreetings = () => {
    const currentHour = Number(moment().format("HH"))

    if (currentHour >= 3 && currentHour < 12) {
        return "SCR_MORNING"
    } else if (currentHour >= 12 && currentHour < 15) {
        return "SCR_AFTERNOON"
    } else if (currentHour >= 15 && currentHour < 20) {
        return "SCR_EVENING"
    } else if (currentHour >= 20 && currentHour < 3) {
        return "SCR_NIGHT"
    } else {
        return "SCR_HELLO"
    }
}

export const formatPhoneNumber = (phone: string) => {
    return `0${phone?.slice(3)}`
}

export const parseQueryString = (url: string) => {
    var query = url.split("?")[1]
    var params = query.split("&")
    var paramObj: any = {}

    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split("=")
        var key = decodeURIComponent(pair[0])
        var value = decodeURIComponent(pair[1])
        paramObj[key] = value
    }

    return paramObj
}

export const replaceHttps = (url: string) => {
    return url?.replace("https://", "")
}

export const renderData = (data: any) => {
    if (data) {
        return data
    }
    return "-"
}
