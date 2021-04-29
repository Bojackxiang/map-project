import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Toolbar,
} from "@material-ui/core";
import { useClasses } from "./Header.style";
import CodeIcon from "@material-ui/icons/Code";
import { useContext} from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HeaderComponent = () => {
  const classes = useClasses();
  const history = useHistory();


  const { isLoggedIn, updateUserAuth } = useContext(AuthContext);

  const _onLogoutClicked = () => {
    localStorage.removeItem(process.env.REACT_APP_SESSION_NAME as string);
    updateUserAuth({ isLoggedIn: false });
    history.push("/login");
  };

  const _onIconBtnClicked = () => {
    history.push('/welcome')
  }

  // components
  const component_icon_btn = (
    <IconButton edge="start" color="inherit" aria-label="menu" onClick={_onIconBtnClicked}>
      <CodeIcon fontSize="large" />
    </IconButton>
  );

  return (
    // <FullWidthWrapper bgColor={CONSTANTS.header.headerBgColor}>
    <AppBar position="static" className={classes.appBar}>
      <Container maxWidth="lg">
        <Box className={classes.container}>
          <Toolbar className={classes.toolbar}>
            {component_icon_btn}
            <Box flexGrow={1} />
            {Boolean(isLoggedIn) && (
              <>
              <Link href="/home" style={{ color: "white", marginRight: '20px' }}>
                Home
              </Link>
              <Link href="/dashboard" style={{ color: "white", marginRight: '20px' }}>
                Dashboard
              </Link>
              <Link style={{ color: "white" }} onClick={_onLogoutClicked}>
                Logout
              </Link>
              </>
            )}

            {!Boolean(isLoggedIn) && (
              <>
              <Link href="/login" style={{ color: "white" }}>
                login
              </Link>
              <Link href="/sign-up" style={{ color: "white", marginLeft: 10 }}>
                Sign up
              </Link>
              </>
            )}
          </Toolbar>
        </Box>
      </Container>
    </AppBar>
    // </FullWidthWrapper>
  );
};

export default HeaderComponent;
