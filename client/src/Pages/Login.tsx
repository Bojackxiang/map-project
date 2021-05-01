import useLoginForm from "../Components/CustomizedHooks/useLoginForm";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import useCheckiSessionToken from "../Components/CustomizedHooks/useCheckiSessionToken";
import { AuthContext } from "../context/AuthContext";
import React from "react";

const Login = () => {
  const {updateUserAuth} = React.useContext(AuthContext);
  const { email, password, _onFormChange, _onSubmit, error } = useLoginForm(updateUserAuth);
  useCheckiSessionToken({ successJumpTo: "/home" });
  const classes = useClasses();
  return (
    <Box className={classes.wrapper}>
      <Box textAlign="center">
        <Typography variant="h4">Login</Typography>
      </Box>

      <Box className={classes.inputWrapper}>
        <TextField
          placeholder="Email"
          fullWidth
          variant="outlined"
          value={email}
          name="email"
          onChange={(e) => _onFormChange(e)}
        />
      </Box>
      <Box className={classes.inputWrapper}>
        <TextField
          placeholder="Password"
          fullWidth
          variant="outlined"
          name="password"
          value={password}
          type="password"
          onChange={(e) => _onFormChange(e)}
        />
      </Box>

      <Box className={classes.inputWrapper}>
        <Typography className={classes.errorMsg}>{error.message}</Typography>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={_onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

const useClasses = makeStyles(theme => ({
  wrapper: {
    width: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down('xs')]: {
      width:'100%'
    }
  },
  inputWrapper: {
    margin: 20,
  },
  errorMsg: {
    color: "red",
  },
}));
