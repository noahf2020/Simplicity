
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import PageHeader  from '../components/utils/PageHeader'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function Settings() {
  const auth = getAuth();

const onPress = () =>{
  auth.signOut()
}
    return (
        <>
      
      <SafeAreaView  style={styles.container}>
   
         <PageHeader title="Settings"/>

         <SafeAreaView style={styles.Bigcontiner}>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.text}>Logout</Text>
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
    text: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });