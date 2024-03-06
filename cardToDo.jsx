import { Image, Text, TouchableOpacity } from "react-native";
import click from "./assets/check.png";
import { s } from "./cardToDo-style";
export function CardToDo({ todo , updateToDo}) {
  return (
    <TouchableOpacity style={s.touch} onPress={()=>{updateToDo({...todo,'isDone':!todo.isDone})}}>
      <Text
        style={[s.text, todo.isDone && { textDecorationLine: "line-through" }]}
      >
        {todo.title}
      </Text>
      {todo.isDone && <Image source={click} style={s.click} />}
    </TouchableOpacity>
  );
}
