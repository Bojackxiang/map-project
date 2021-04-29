import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import useCheckiSessionToken from "../Components/CustomizedHooks/useCheckiSessionToken";
import AutoComplete from "../Components/GoogleAPI/AutoComplete/AutoComplete.component";
import GoogleMap from "../Components/GoogleAPI/Map/GoogleMap.component";

export interface BasicLocation {
  longitude: number | null;
  latitude: number | null;
}

interface IUserLocation extends BasicLocation {
  userLocationLoading: boolean;
}

interface ISelectedUserLocation extends BasicLocation {
  selectedAddress: string;
}

const Home = () => {
  // only authenticated user can login
  useCheckiSessionToken({ failJumpTo: "/login" });
  // current user location
  const [userLocation, setUserLocation] = useState<IUserLocation>({
    longitude: null,
    latitude: null,
    userLocationLoading: true,
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

  // get user current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setUserLocation({ longitude, latitude, userLocationLoading: false });
    });
  }, []);

  // input changes
  const _onHandleInputChange = (address: string) => {
    setAutoCompleteAddress(address);
  };

  // triggered when user selected from the recommend list
  const _onHandleSelectAddress = async (address: string) => {
    const results = await geocodeByAddress(address);
    const position = await getLatLng(results[0]);

    if (position.lat && position.lng) {
      setSelectedAddress({
        longitude: position.lng,
        latitude: position.lat,
        selectedAddress: address,
      });
    }
  };

  return (
    <Box>
      {userLocation.userLocationLoading && (
        <>
          <Typography>
            If you loading time is too long, check your browser setting and
            refresh
          </Typography>
        </>
      )}

      {!userLocation.userLocationLoading && (
        <>
          <Box mb="20px" textAlign="center" minHeight={200}>
            <Typography variant="h5">I just got your location !</Typography>
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
        </>
      )}

      <Box textAlign="center" style={{position: 'relative'}}>
        <AutoComplete
          address={autoCompleteAddress}
          handleChange={_onHandleInputChange}
          handleSelect={_onHandleSelectAddress}
        />
      </Box>

      <Grid container>
        <Grid item xs={12}>
          <Box style={{ margin: "0 auto" }}>
            <GoogleMap
              myLocation={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              selectedLocation={{
                latitude: selectedAddress.latitude,
                longitude: selectedAddress.longitude,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
