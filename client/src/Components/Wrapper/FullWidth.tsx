import { FC } from "react";
import { Box } from "@material-ui/core";

interface IWrapper {
  bgColor?: string;
  children: React.ReactNode;
}
const FullWidthWrapper: FC<IWrapper> = (props) => {
  return (
    <Box style={{ backgroundColor: props.bgColor  }}>
      {props.children}
    </Box>
  );
};

FullWidthWrapper.defaultProps = {
  bgColor: "transparent",
};

export default FullWidthWrapper;
