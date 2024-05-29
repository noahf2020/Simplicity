
import { getAuth, onAuthStateChanged } from "firebase/auth";
var CryptoJS = require("crypto-js");
import AsyncStorage from '@react-native-async-storage/async-storage';

export  function secureConnection(){
    //console.log(getAuth())
    const dataToEncrypt = 'sensitiveData';
    const secretKey = 'yourSecretKey';
    const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
    
}
export async function getCanvasApi(){
    try {
        const apikey = await AsyncStorage.getItem('canvasapikey');
        if (apikey !== null) {
            return apikey
        }
      } catch (error) {
       return false
      }
}

export async function setCanvasApi(key){
    await AsyncStorage.setItem('canvasapikey', key);
    return true
}

export async function checkApiKey(){
    return true
}