
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import PageHeader  from '../components/PageHeader'


export default function Calendar() {

    return (
        <>
      
      <SafeAreaView  style={styles.container}>
   
         <PageHeader title="Calendar"/>
       
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