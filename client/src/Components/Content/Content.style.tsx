import { makeStyles } from "@material-ui/core";
import { CONSTANTS } from "../../support/CONSTANTS";
const { content } = CONSTANTS;
export const useClasses = makeStyles((theme) => ({
  content_wrapper: {
    maxWidth: content.maxWidth,
    margin: "0 auto",
    marginTop: 20,
    display: 'flex',
    flexGrow: 1
  },
}));
