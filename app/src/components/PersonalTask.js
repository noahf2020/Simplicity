import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
  } from 'react-native';


export default function PersonalTask({title}) {
  return (
            <>
             <View style={styles.item}>
           <Text style={styles.title}>{title}</Text>
         </View>
            </>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 0.8,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
     
    },
    item:{
        width:340,
        height:75,
        marginBottom:10,
        marginTop:20,
        borderRadius: 15,
        backgroundColor:'#F6F5FB'

    }
})