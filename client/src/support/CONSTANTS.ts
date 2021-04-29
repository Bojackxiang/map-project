import { colors } from "@material-ui/core"

export type TYPE_MENU_ITEM = {
    name: string; value: string
}
export const MENU_ITEMS = [
    {name: 'SUBJECT', value: 'Subject'},
    {name: 'EDU', value: 'Education'},
    {name: 'EXPERIENCE', value: 'Working Experience'},
    {name: 'TECH', value: 'Tech Stack'},
]

export const CONSTANTS = {
    header: {
        maxWidth: 1200,
        headerBgColor: colors.blue[400],
        headerTxtColor: colors.common.white,
        height: 60, 
    },
    content: {
        maxWidth: 1200,
        bgColor: '#e0e0e0'
    },
    loading: {
        timer: 1500, 
    },
    footer: {
        bgColor: '#e0e0e0'
    },
    experience: {
        width: 1000, 
    }
    
    
}