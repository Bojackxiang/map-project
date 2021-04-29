import { makeStyles } from "@material-ui/core";

export const useClasses = makeStyles({
  screenWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.8)",
    zIndex: 1201,
  },
  loadingImage: {
    height: 100,
    width: 100,
  },
});
