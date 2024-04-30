
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,TextInput } from 'react-native';
import PageHeader  from '../components/utils/PageHeader'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React,{useState, useEffect, useRef, useMemo, useCallback} from 'react';
import { getCanvasApi, setCanvasApi } from '../helper/Settings';

export default function Settings() {
  const auth = getAuth();

  const [apiKey, setApiKey] = useState("")

    const onPress = () =>{
      auth.signOut()
    }

    const save = () =>{
      setCanvasApi(apiKey)
    }

    useEffect(async ()=>{
      async function getData(){
        let data = await getCanvasApi()
        setApiKey(data)
      }
   
      getData()
    },[])

    return (
        <>
      
      <SafeAreaView  style={styles.container}>
   
         <PageHeader title="Settings"/>

         <SafeAreaView style={styles.Bigcontiner}>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>

                <TextInput style={styles.Input} 
                                              containerStyle={{ marginTop: 15 }}
                                              placeholder="Canvas API Key"
                                              value={apiKey}
                                              autoCapitalize="none"
                                              autoCompleteType="off"
                                              autoCorrect={false}
                                              keyboardType="default"
                                              returnKeyType='done'
                                              onChangeText={(text) => setApiKey(text)}
                               />   
                                   <TouchableOpacity style={styles.button2} onPress={save}>
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
         </SafeAreaView>
       
      </SafeAreaView>
        </>
       
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Bigcontiner:{
      backgroundColor:"#F6F6F6",
      height:"85%",
      width:"100%",
      borderRadius:30,
      alignItems:"center"
    },
    Input:{
      height:'8%',
      width:'70%',
      backgroundColor:'#fff',
      borderColor: '#E0E0E0',
      borderWidth:1,
      borderRadius:6,
      paddingLeft:18,
      fontSize: 16,
      marginTop:'10%'
    },
    button: {
      backgroundColor: '#007AFF', // Apple's blue color
      borderRadius: 10,
       alignSelf:"center",
      marginTop:"10%",
      height:"10%",
      width:"70%",
      alignItems:"center",
     justifyContent:"center"
    },
    button2:{
      backgroundColor: 'grey', // Apple's blue color
      borderRadius: 10,
       alignSelf:"center",
      marginTop:"10%",
      height:"7%",
      width:"60%",
      alignItems:"center",
     justifyContent:"center"
    },
    text: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });