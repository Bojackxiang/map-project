import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useClasses } from "./Footer.style";

const FooterComponent = () => {
  const classes = useClasses();
  return <Box className={classes.footer_wrapper}>
    <Typography variant="h5" className={classes.footerText}>
      Thank you
    </Typography>
  </Box>;
};

export default FooterComponent;
