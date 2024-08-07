import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";



const LaunchContext = createContext();


const LaunchProvider = (props) => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  
    useEffect(async () => {
      async function checkData(){
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData == null) {
          setIsAppFirstLaunched(true);
          AsyncStorage.setItem('isAppFirstLaunched', 'false');
        } else {
          setIsAppFirstLaunched(false);
        }
    //    AsyncStorage.removeItem('isAppFirstLaunched');
      }
     await checkData()
      // 
    }, []);
    const login = () => {
      setIsAppFirstLaunched(false);
    };
  
    return (
      <LaunchContext.Provider 
      value={{isAppFirstLaunched,login}}>
        {props.children}
      </LaunchContext.Provider>
    );
  };
  
  export { LaunchContext, LaunchProvider };