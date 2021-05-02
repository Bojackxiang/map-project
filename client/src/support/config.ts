const flag_deploy_mode = process.env.REACT_APP_MODE;
const configs = {
  api_url: "",
};

switch (flag_deploy_mode) {
  case "DEV":
    configs.api_url = "http://localhost:3001";
    break;
  case "PRODUCTION":
    configs.api_url = "http://188.166.249.227:3001";
    break;
  default:
    configs.api_url = "http://188.166.249.227:3001";
    break;
}
if (flag_deploy_mode === "DEV") {
  console.log("configs: ", configs);
}

export default configs;
