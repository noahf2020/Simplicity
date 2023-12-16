

export function StringCheck(string,lengthRequirement){
    console.log("String Length: " +string.length)
    try{
        if (string.length >= lengthRequirement) {
            return true;
          } else {
            return false;
          }
    }catch(e){
        console.log(e)
        return e

    }
}


