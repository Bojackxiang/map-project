import { Box } from "@material-ui/core";
import { FC } from "react";

interface IBox {
  height?: number | string;
}
const Spacer: FC<IBox> = (props) => {
  return <Box style={{ width: "100%", height: props.height }} />;
};

Spacer.defaultProps = {
  height: "20px",
};

export default Spacer;
