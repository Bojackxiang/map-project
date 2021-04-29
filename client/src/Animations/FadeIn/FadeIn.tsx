import React, { FC, useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { Transition } from "react-transition-group";

interface IFadeIn {
  children: React.ReactChild;
}

const FadeIn: FC<IFadeIn> = (props) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
    unmounted: { opacity: 0 },
  };

  return (
    <Transition in={fadeIn} timeout={1}>
      {(state) => (
        <Box
          style={{
            transition: `opacity 200ms ease-in-out`,
            ...transitionStyles[state],
          }}
        >
          {props.children}
        </Box>
      )}
    </Transition>
  );
};


export default FadeIn;
