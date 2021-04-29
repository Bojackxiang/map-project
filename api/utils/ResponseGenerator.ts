export const responseGenerator = (success?: boolean, message?: string, payload?: any) => {
    return {
        success: success ?? true, 
        message: message ?? '', 
        payload: payload ?? null
    }
}



export const serverResponse = (success?: boolean, message?: string, payload?: any, code?: number) => {
    return {
        success: success ?? true, 
        message: message ?? '',
        payload: payload ?? '',
        code: code ?? 200
    }
}

