import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import useCheckiSessionToken from "../Components/CustomizedHooks/useCheckiSessionToken";

const Welcome = () => {
  const classes = useClasses();
  useCheckiSessionToken({ successJumpTo: "/home" });
  return (
    <Box className={classes.wrapper}>
      <Typography variant="h4">Thank you for your time! </Typography>
      <Typography>Once you logged in, you cannot react me! </Typography>
    </Box>
  );
};

export default Welcome;

const useClasses = makeStyles({
  wrapper: {
    width: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
});
