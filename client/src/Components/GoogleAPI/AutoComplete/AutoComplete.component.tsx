import { Box, List, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

interface BasicLocation {
  longitude: number | null;
  latitude: number | null;
}

interface IUserLocation extends BasicLocation {
  userLocationLoading: boolean;
}

interface IAutoComplete {
  getInputProps: any;
  suggestions: any;
  getSuggestionItemProps: any;
  loading: any;
}

interface AutoCompleteProps {
  address: string; 
  handleChange: (address: string) => void;
  handleSelect: (address: string) => void;
}
const AutoComplete:React.FC<AutoCompleteProps> = (props) => {
  const {address, handleChange, handleSelect} = props;
  
  // current user location
  const [userLocation, setUserLocation] = useState<IUserLocation>({
    longitude: null,
    latitude: null,
    userLocationLoading: true,
  });

  // 获取用户当前的地址
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setUserLocation({ longitude, latitude, userLocationLoading: false });
    });
  }, []);

  return (
    <Box>
      <Box>
        {userLocation.userLocationLoading && <Typography>loading</Typography>}
      </Box>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({
          getInputProps,
          suggestions,
          getSuggestionItemProps,
          loading,
        }: IAutoComplete) => (
          <div>
            <TextField
              fullWidth
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />

            <Box className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion: any) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: "#007bb2",
                      cursor: "pointer",
                      color: "white",
                    }
                  : {
                      backgroundColor: "#33bfff",
                      cursor: "pointer",
                      color: "white",
                    };
                return (
                  <List
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </List>
                );
              })}
            </Box>
          </div>
        )}
      </PlacesAutocomplete>

    </Box>
  );
};

export default AutoComplete;
