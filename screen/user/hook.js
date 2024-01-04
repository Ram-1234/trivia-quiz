import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("users");
        if (value !== null) {
          console.log("value", value);
          let jsonData = JSON.parse(value);
          setData(jsonData);
        }
      } catch (e) {
        // error reading value
        console.warn(e);
      }
    };
    getData();
  }, []);

  return data;
};
