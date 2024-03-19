import { AntDesign, FontAwesome5, Ionicons   } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'


export async function getClasses(){

    let myToken = '2073~cE5mcOGbroEkXzvt7Q55rVQL117g5WhoqITdT0JRNMFWritmRdideBDSIndNRtBw'
    let school = "scienceleadership.instructure.com"

    let request =  await axios({ method: 'get', url: `https://${school}/api/v1/dashboard/dashboard_cards`, headers:{'Authorization': `Bearer ${myToken}`} })
    let data = request.data
     data.forEach((subject) => {
      console.log(subject.shortName)
      });
}