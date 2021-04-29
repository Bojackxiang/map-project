import { Box } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { CONSTANTS } from "../../../support/CONSTANTS";
import { useClasses } from "./FullPageLoading.style";

interface IFullPageLoading {
  loading: boolean;
}

const FullPageLoading: FC<IFullPageLoading> = (props) => {
  const { loading } = props;
  const [loadingStatus, setLoadingStatus] = useState({
    loading: loading,
  });
  const classes = useClasses();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingStatus((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    }, CONSTANTS.loading.timer);
    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <>
      {loadingStatus.loading && (
        <Box className={`${classes.screenWrapper}`}>
          <img
            className={classes.loadingImage}
            src="/assets/loading.gif"
            alt="loading"
          />
        </Box>
      )}
    </>
  );
};

export default FullPageLoading;
