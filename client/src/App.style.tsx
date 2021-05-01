import { makeStyles } from "@material-ui/core";
import { CONSTANTS } from "./support/CONSTANTS";

const {content} = CONSTANTS

export const useClasses = makeStyles({
    appWrapper: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
    },
    appWrapper_content: {
        flexGrow: 1,
        backgroundColor: content.bgColor,
        display: 'flex',
        flexDirection: 'column',
    }
})