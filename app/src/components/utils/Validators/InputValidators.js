

export function StringCheck(string,lengthRequirement){
    try{
        if (string.length >= lengthRequirement) {
            return true;
          } else {
            return false;
          }
    }catch(e){

        return e

    }
}


