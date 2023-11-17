import React from "react";
import { Ionicons,FontAwesome5 } from "@expo/vector-icons";

export default (props) => {

  return (
    <Ionicons
      name={props.icon}
      style={{ marginBottom: -7 }}
      size={24}
      color={  
        props.focused
        ? "#3D3270"
        : "rgb(143, 155, 179)"
       
      }
    />
  );
};