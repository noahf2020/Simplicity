
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import PageHeader  from '../components/utils/PageHeader'


export default function Profile() {

    return (
        <>
      
      <SafeAreaView  style={styles.container}>
   
         <PageHeader title="Profile"/>
       
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
  });