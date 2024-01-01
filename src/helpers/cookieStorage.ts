import Cookies from "cookies-ts"

const cookies = new Cookies()

const get = (key: string) => {
    return cookies.get(key)
}

const remove = (key: string) => {
    return cookies.remove(key)
}

const set = (key: string, value: any) => {
    return cookies.set(key, value)
}

export const cookiesStorage = {
    get,
    set,
    remove,
}
