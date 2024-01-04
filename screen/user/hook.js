import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("users");
        if (value !== null) {
          let jsonData = JSON.parse(value);
          setData(jsonData);
        }
      } catch (e) {
        console.warn(e);
      }
    };
    getData();
  }, []);

  /**delete data lits**/
  // useEffect(()=>{
  //   const removeValue = async () => {
  //     try {
  //       await AsyncStorage.removeItem('users')
  //     } catch(e) {
  //       // remove error
  //     }
  //     console.log('Done.')
  //   }
  //   removeValue()
  // },[])

  return data;
};
