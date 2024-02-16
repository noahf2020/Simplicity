import { AntDesign, FontAwesome5, Ionicons   } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';


// export function getAllCategories(){
//     return categories = [
//         {
//           "name": "Calndar",
//           "color":"#FEF5D3",
//           "image":"calendar",
//            "id":"1s"
//         },
//         {
//           "name": "Calnda2",
//           "color":"#DBECF6",
//           "image":"calendar",
//           "id":"1ws"
//         }
//       ]
// }
export async function getAllCategories(){
  try {
    const storedCats = await AsyncStorage.getItem('categories');
    if (storedCats !== null) {
      console.log(storedCats)
      return JSON.parse(storedCats);
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}


export function getCreateCategories(){
  return  categories = [

   
    {label: 'Calendar', value: 'calendar', icon: (color) => <AntDesign name={'calendar'} size={24} color={color|| "black"} /> },
    {label: 'Clipboard', value: 'clipboard-list', icon: (color) => <FontAwesome5 name={'clipboard-list'} size={24} color={color|| "black"} /> },
    {label: 'School', value: 'school-outline', icon: (color) => <Ionicons name={'school-outline'} size={24} color={color|| "black"} /> },
    {label: 'Home', value: 'home-outline', icon: (color) => <Ionicons name={'home-outline'} size={24} color={color|| "black"} /> }
  ]
}

export async function addCategory(categoryName, image, color){
  const storedCategories = await AsyncStorage.getItem('categories');
  if(storedCategories){
    let categories = JSON.parse(storedCategories)
    const newCats = [...categories, { id: uuidv4(),  "name":categoryName, "color":color,  "image":image,}];
    await AsyncStorage.setItem('categories', JSON.stringify(newCats));
  }else{
    const newCats = [{ id: uuidv4(),  "name":categoryName, "color":color,  "image":image,}];
    await AsyncStorage.setItem('categories', JSON.stringify(newCats));
  }



}