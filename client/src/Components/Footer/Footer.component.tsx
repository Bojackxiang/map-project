import React from "react";
import { Box } from "@material-ui/core";
import { useClasses } from "./Footer.style";

const FooterComponent = () => {
  const classes = useClasses();
  return <Box className={classes.footer_wrapper}>this is footer </Box>;
};

export default FooterComponent;
