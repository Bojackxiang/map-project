import { CssBaseline, ThemeProvider } from "@material-ui/core";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./support/Theme";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
