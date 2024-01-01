
interface useLocalStorageProps {
    getLocalStorage: (key: string) => void;
    setLocalStorage: (key: string, value: any) => void;
    removeLocalStorage: (key: string) => void;
}

function useLocalStorage(): useLocalStorageProps {

    const getLocalStorage = (key: string) => {
        try{
            return JSON.parse(localStorage.getItem(key) || "{}");
        }catch(err){
            return localStorage.getItem(key);
        }
    };
    
    const setLocalStorage = (key: string, value: any) => {
        return localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    };
    
    const removeLocalStorage = (key: string) => {
        return localStorage.removeItem(key);
    };
     

    return {
        getLocalStorage, setLocalStorage, removeLocalStorage
    }
}

export default useLocalStorage;