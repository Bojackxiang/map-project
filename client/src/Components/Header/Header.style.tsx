import { makeStyles } from "@material-ui/core";
import { CONSTANTS } from "../../support/CONSTANTS";

const { header } = CONSTANTS;

export const useClasses = makeStyles({
  container: {
    backgroundColor: header.headerBgColor,
    color: header.headerTxtColor,
    height: header.height,
    display: 'flex', 
    alignItems: 'center',
  },
  toolbar: {flex: 1 },
  appBar: {
    backgroundColor: header.headerBgColor,
  },
  sideDraw_list: {
    minWidth: 300
  }
});
