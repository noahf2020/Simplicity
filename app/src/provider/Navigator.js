import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Image, Button,Text } from "react-native";
import TabBarIcon from '../components/TabBarIcon'
//Screens
import Home from "../screens/Home";
import Profile from '../screens/Profile'
import Calendar from "../screens/Calendar";
import Settings from "../screens/Settings";
// Auth screens
import Login from "../screens/Login";

import { AuthContext } from "../provider/AuthProvider";
import Personal from "../screens/Personal";
import { Ionicons } from '@expo/vector-icons'; 
import ImageButton from "../components/ImageButton";
// Better put your these secret keys in .env file



const firebaseConfig = {
    apiKey: "AIzaSyDacwAZiVyqYQXELSLg1JSXwZ59JTmJ8bk",
    authDomain: "test-f5b33.firebaseapp.com",
    projectId: "test-f5b33",
    storageBucket: "test-f5b33.appspot.com",
    messagingSenderId: "1046513344002",
    appId: "1:1046513344002:web:8800e5ac3b972acf32911b",
    measurementId: "G-JPLT50LW01"
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
    options={{title: 'My home'}}
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false, // applied here
        headerTitle: false,

        headerBackTitleVisible: true,
        headerStyle: {
            backgroundColor: '#fffff',
       
            borderBottomColor: "#ffffff",
          }
      }}
    >


      <MainStack.Screen name="Maintabs" component={MainTabs} 
      options={{
        headerTitle: () =>(
            <>
            <Text></Text>
            </>
        ),

        
        headerRight: () => (
            <ImageButton onPress={()=>{console.log("menutBTNPressed")}}  source="menufold"  size={24} color={"#4A4A4B"}/> 

        
          ),
      }}
      
      />
  
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();


const MainTabs = () => {

  return (
    <>

 
    <Tabs.Navigator 
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
            borderTopColor: "#ffffff",
            backgroundColor: "#ffffff",
          //  height:"30px"
          },
       
      }}
    >
        
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{   
           
            tabBarIcon: ({ focused }) => (
               <TabBarIcon icon="md-home-outline" focused={focused}/>
          ),}}
          />

<Tabs.Screen
        name="Profile"
        component={Profile}
        options={{   
            tabBarIcon: ({ focused }) => (
               <TabBarIcon icon="person-outline" focused={focused}/>
          ),}}
          />
     <Tabs.Screen
        name="Todo"
        component={Personal}
        //list-alt
        options={{   
            tabBarIcon: ({ focused }) => (
               <TabBarIcon icon="list" focused={focused}/>
          ),}}
      />

<Tabs.Screen
        name="Calendar"
        component={Calendar}
        //list-alt
        options={{   
            tabBarIcon: ({ focused }) => (
               <TabBarIcon icon="ios-calendar-sharp" focused={focused}/>
          ),}}
      />
       <Tabs.Screen
        name="Settings"
        component={Settings}
        //list-alt
        options={{   
            tabBarIcon: ({ focused }) => (
               <TabBarIcon icon="settings-outline" focused={focused}/>
          ),}}
      />
   
    </Tabs.Navigator>
    </>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == false && <Main />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};