import { colors, makeStyles } from "@material-ui/core";

export const useClasses = makeStyles({
    footer_wrapper: {
        minHeight: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue[400]

    },
    footerText: {
        color: colors.common.white
    }
    
})