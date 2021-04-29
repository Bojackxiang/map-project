import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import useCheckiSessionToken from "../Components/CustomizedHooks/useCheckiSessionToken";
import useSignUpHook from "../Components/CustomizedHooks/useSignUpHook";

const SignUp = () => {
  useCheckiSessionToken({ successJumpTo: "/" });
  const classes = useClasses();

  const {
    email,
    password,
    _onFormChange,
    _onSubmit,
    message,
    username,
    isAdmin,
    _onModeSwitch
  } = useSignUpHook();

  return (
    <Box className={classes.wrapper}>
      <Box textAlign="center">
        <Typography variant="h4">Sign Up</Typography>
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
          placeholder="Username"
          fullWidth
          variant="outlined"
          name="username"
          value={username}
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

      <Box>
        <Button fullWidth  onClick={_onModeSwitch}>
          Create A {isAdmin ? `Admin` : `Reader` } (Click me to switch)
        </Button>
      </Box>

      <Box className={classes.inputWrapper}>
        <Typography className={classes.errorMsg}>{message}</Typography>
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

export default SignUp;

const useClasses = makeStyles({
  wrapper: {
    width: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  inputWrapper: {
    margin: 20,
  },
  errorMsg: {
    color: "grey",
  },
  adminCreator: {
    backgroundColor: 'red',
    color: 'white'
  }
});
