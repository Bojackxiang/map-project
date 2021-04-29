import { makeStyles } from "@material-ui/core";
import {CONSTANTS} from '../../support/CONSTANTS'
const  {footer} = CONSTANTS;

export const useClasses = makeStyles({
    footer_wrapper: {
        backgroundColor:footer.bgColor,
    }
    
})