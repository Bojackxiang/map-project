import React, { useState, useEffect } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "react-google-maps";
import { BasicLocation } from "../../Content/Content.component";

interface IGoogleMapComponent {
  myLocation: BasicLocation;
  selectedLocation: BasicLocation;
}

const GoogleMapComponent: React.FC<IGoogleMapComponent> = (props) => {
  // my current location
  // target location
  const { myLocation, selectedLocation } = props;
  const DirectionsService = new google.maps.DirectionsService();
  let [directions, setDirections] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('')
  const classes = useClasses()

  useEffect(() => {
      if (
        selectedLocation.latitude &&
        selectedLocation.longitude &&
        myLocation.latitude &&
        myLocation.longitude
      ) {
        DirectionsService.route(
          {
            origin: { lat: myLocation.latitude, lng: myLocation.longitude },
            destination: {
              lat: selectedLocation.latitude,
              lng: selectedLocation.longitude,
            },
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              setErrorMsg('I cannot get to this place !')
            }
          }
        );
      }
       // eslint-disable-next-line
  }, [selectedLocation]);

  const GoogleMapDisplay = withGoogleMap((props) => {
    return myLocation.latitude && myLocation.longitude ? (
      <GoogleMap
        defaultCenter={{ lat: myLocation.latitude, lng: myLocation.longitude }}
        defaultZoom={20}
      >
        {Boolean(myLocation.latitude) && Boolean(myLocation.longitude) && (
          <Marker
            icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
            position={{
              lat: myLocation.latitude as number,
              lng: myLocation.longitude as number,
            }}
          />
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    ) : (
      <Typography>Tying to find your location ....</Typography>
    );
  });

  return (
    <Box>
      <Box>
      <Typography className={classes.errorMsg}>{errorMsg}</Typography>
      </Box>
      <GoogleMapDisplay
        containerElement={<div style={{ height: `500px`, width: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Box>
  );
};

export default GoogleMapComponent;

const useClasses = makeStyles({
  errorMsg: {
    color: 'red'
  }
})
