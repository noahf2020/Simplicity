import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image
 
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    
    await signInWithEmailAndPassword(auth, email, password).catch(function (
      error
    ) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      setLoading(false);
      alert(errorMessage);
    });
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F6F6F6",
            }}
          >
          <Image
        style={{height:100,width:'50%', paddingTop:"10%"}}
        source={require('../../assets/Simplicity.jpg')}
      />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor:"#F6F6F6",
            }}
          >
         
           
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

      
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              text={loading ? "Loading" : "Sign In"}
              onPress={() => {
                login();
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

       
    
       
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}