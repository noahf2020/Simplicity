import React from "react";
import AppNavigator from "./src/provider/Navigator";
import { AuthProvider } from "./src/provider/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox } from "react-native";

export default function App() {


  // Ignore firebase v9 AsyncStorage warning
  React.useEffect(() => {
    LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    ]);
  }, []);

  return (
    
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>

  );
}