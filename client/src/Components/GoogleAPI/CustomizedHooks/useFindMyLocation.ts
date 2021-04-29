import { useEffect, useState } from "react";
import { BasicLocation } from "../../Content/Content.component";

interface IUserLocation extends BasicLocation {
  userLocationLoading: boolean;
}

const useFindMyLocation = () => {
  const [userLocation, setUserLocation] = useState<IUserLocation>({
    longitude: null,
    latitude: null,
    userLocationLoading: true,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setUserLocation({ longitude, latitude, userLocationLoading: false });
    });
  }, []);

  return {
    ...userLocation
  }
};

export default useFindMyLocation;
