import { Image, Pressable, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export default function ImageButton({ onPress, source, size, color  }) {
  return (
      <Pressable
      onPress={onPress} 
      style={( { pressed } ) => {
        return [styles.row, pressed ? styles.pressed : styles.notPressed]
        }}>
        <AntDesign name={source} size={size} color={color} />
      </Pressable>
  );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0
    },
    notPressed: {
        opacity: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        margin: 16
    }
});