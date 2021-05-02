import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Alert from "@material-ui/lab/Alert";
import useCheckiSessionToken from "../Components/CustomizedHooks/useCheckiSessionToken";
import AutoComplete from "../Components/GoogleAPI/AutoComplete/AutoComplete.component";
import Spacer from "../Components/Spacer/Spacer";
import MyPositionMap from "../Components/MyPositionMap/MyPositionMap";

export interface BasicLocation {
  longitude: number | null;
  latitude: number | null;
}

interface ISelectedUserLocation extends BasicLocation {
  selectedAddress: string;
}

const Home = () => {
  // only authenticated user can login
  useCheckiSessionToken({ failJumpTo: "/login" });

  // ui status
  const [uiStatus, setUIStatus] = useState({
    loading: true,
    error: false,
    errorMessage: "",
  });

  // current user location
  const [userLocation, setUserLocation] = useState<BasicLocation>({
    longitude: null,
    latitude: null,
  });

  // input address tring
  const [autoCompleteAddress, setAutoCompleteAddress] = useState("");

  // selected address data
  const [selectedAddress, setSelectedAddress] = useState<ISelectedUserLocation>(
    {
      longitude: null,
      latitude: null,
      selectedAddress: "",
    }
  );

  const [showDirection, setShowDirection] = useState(false);

  const [alertDisplay, setAlertDisplay] = useState(false);

  // get user current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation({ longitude, latitude });
        setUIStatus({
          error: false,
          errorMessage: ``,
          loading: false,
        });
      },
      (error) => {
        setUIStatus({
          error: true,
          errorMessage: `Error happens when find your location: ${error.message}. So we we set the default location at town hall`,
          loading: false,
        });
        setUserLocation({ longitude: 151.207001, latitude: -33.873001 });
      }
    );
  }, []);

  // alert display control
  useEffect(() => {
    let timer: any = null;
    if (alertDisplay === true) {
      setTimeout(() => {
        setAlertDisplay(false);
      }, 2000);
    }
    return () => {
      clearImmediate(timer);
    };
  }, [alertDisplay]);

  // methods group
  const methods = {
    _onHandleInputChange: useCallback((address: string) => {
      setShowDirection(false);
      if (showDirection) setShowDirection(false);
      setAutoCompleteAddress(address);
      // eslint-disable-next-line
    }, []),

    _onHandleSelectAddress: async (address: string) => {
      setShowDirection(false);
      if (showDirection) setShowDirection(false);
      const results = await geocodeByAddress(address);
      const position = await getLatLng(results[0]);

      if (position.lat && position.lng) {
        setSelectedAddress({
          longitude: position.lng,
          latitude: position.lat,
          selectedAddress: address,
        });
      }
    },

    _onGenerateDirection: () => {
      if (
        !selectedAddress.selectedAddress ||
        !selectedAddress.latitude ||
        !selectedAddress.longitude
      ) {
        setAlertDisplay(true);
      } else {
        setShowDirection(true);
      }
    },
  };

  // component error
  const component_error_message = (
    <>
      {uiStatus.error && uiStatus.errorMessage.length > 0 && (
        <Alert severity="error">{uiStatus.errorMessage}</Alert>
      )}
    </>
  );

  // loading component
  const loading_component = (
    <>
      {!uiStatus.loading && (
        <>
          <Paper>
            <Box
              mb="20px"
              textAlign="center"
              minHeight={200}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography variant="h6">
                  LATITUDE: {userLocation.latitude}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  LONGITUDE: {userLocation.longitude}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </>
      )}
    </>
  );

  const component_complete_input = (
    <AutoComplete
      address={autoCompleteAddress}
      handleChange={methods._onHandleInputChange}
      handleSelect={methods._onHandleSelectAddress}
    />
  );

  // location finder component
  const component_location_finder = (
    <>
      {uiStatus.loading && (
        <Box textAlign="center">
          <Typography variant="h4">Finding your location ....</Typography>
          <CircularProgress />
        </Box>
      )}
    </>
  );

  // map component
  const component_google_map = useCallback(() => {
    return (
      <>
        <MyPositionMap
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
          selectedLatitude={selectedAddress.latitude}
          selectedLongitude={selectedAddress.longitude}
          isShowDirection={showDirection}
        />
      </>
    );
  }, [userLocation, selectedAddress, showDirection]);

  // component alert
  const component_alert = (
    <>
      {alertDisplay && (
        <Box
          style={{
            position: "absolute",
            top: 0,
            zIndex: 999999,
            left: 0,
            right: 0,
          }}
        >
          <Alert severity="error">This is an error alert — check it out!</Alert>
        </Box>
      )}
    </>
  );

  return (
    <Box>
      {component_location_finder}
      {component_error_message}
      {loading_component}
      {component_alert}

      <Box textAlign="center" style={{ position: "relative" }}>
        {component_complete_input}
      </Box>

      <Spacer height="40px" />

      <Box>
        {selectedAddress.selectedAddress.length > 0 && (
          <Typography>
            Selected Address: {selectedAddress.selectedAddress}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={methods._onGenerateDirection}
        >
          Take me to there !
        </Button>
      </Box>
      <Spacer />

      <Grid container>
        <Grid item xs={12}>
          <Box style={{ margin: "0 auto" }}>{component_google_map}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
