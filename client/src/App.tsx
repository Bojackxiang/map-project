import { Box } from "@material-ui/core";
import Header from "./Components/Header/Header.component";
import Content from "./Components/Content/Content.component";
import Footer from "./Components/Footer/Footer.component";
import { useClasses } from "./App.style";

import "animate.css";

function App() {
  const classes = useClasses();
  const component_content = (
    <Box className={classes.appWrapper_content}>
      <Content />
    </Box>
  );
  return (
    <Box className={classes.appWrapper}>
      <Header />
      {component_content}
      <Footer />
    </Box>
  );
}

export default App;
