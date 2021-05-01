import { Box, makeStyles, CircularProgress, Typography } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";

const BLUE_DOT = "https://www.robotwoods.com/dev/misc/bluecircle.png";

interface IMyPositionMap {
  latitude: number | null;
  longitude: number | null;
  selectedLatitude?: number | null;
  selectedLongitude?: number | null;
  isShowDirection?: boolean;
}
const MyPositionMap: React.FC<IMyPositionMap> = (props) => {
  const classes = useClasses();
  const DirectionsService = new google.maps.DirectionsService();
  let [directions, setDirections] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    latitude,
    longitude,
    selectedLatitude,
    selectedLongitude,
    isShowDirection,
  } = props;

  useEffect(() => {
    setErrorMsg('')
    if(isShowDirection === true && latitude && longitude && selectedLongitude && selectedLatitude) {
      DirectionsService.route(
        {
          origin: { lat: latitude, lng: longitude },
          destination: {
            lat: selectedLatitude,
            lng: selectedLongitude,
          },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setErrorMsg("I cannot get to this place !");
          }
        }
      );
    }
  }, [isShowDirection, ])
  

  const GoogleMapDisplay = withGoogleMap(() => {
    return (
      <GoogleMap
        defaultCenter={{
          lat: Boolean(selectedLatitude)
            ? (selectedLatitude as number)
            : (latitude as number),
          lng: Boolean(selectedLongitude)
            ? (selectedLongitude as number)
            : (longitude as number),
        }}
        defaultZoom={20}
      >
        {Boolean(selectedLatitude) && Boolean(selectedLongitude) && (
          <Marker
            position={{
              lat: selectedLatitude as number,
              lng: selectedLongitude as number,
            }}
          />
        )}

        <Marker
          icon={BLUE_DOT}
          position={{
            lat: latitude as number,
            lng: longitude as number,
          }}
        />
        {Boolean(isShowDirection) && <DirectionsRenderer directions={directions} />}

        
      </GoogleMap>
    );
  });

  // lazy rendering the ma component
  const component_map_render = useCallback(() => {
    return (
      <>
        {latitude && longitude && (
          <GoogleMapDisplay
            containerElement={<div className={classes.mapWrapper} />}
            mapElement={<div style={{ height: `100%`, width: "100%" }} />}
          />
        )}
      </>
    );
  }, [latitude, longitude, selectedLatitude, selectedLongitude, directions]);

  return (
    <Box>
      {(!latitude || !longitude) && (
        <Box
          minHeight={100}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
      <Typography className={classes.errorMsg}>{errorMsg}</Typography>
      {component_map_render()}
    </Box>
  );
};

const useClasses = makeStyles((theme) => ({
  mapWrapper: {
    height: "500px",
    width: 500,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "600px",
    },
  },
  errorMsg: {
    color: 'red'
  }
}));

MyPositionMap.defaultProps = {
  isShowDirection: false,
};

export default MyPositionMap;
