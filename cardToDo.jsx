import { Image, Text, TouchableOpacity, Alert } from "react-native";
import click from "./assets/check.png";
import { s } from "./cardToDo-style";
export function CardToDo({ todo, updateToDo, deleteToDo }) {
  const deleteTodoAlert = () => {
    Alert.alert("Delete ToDo", "Are you sure to delete this Todo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteToDo(todo) },
    ]);
  };

  const completeTodoAlert = () => {
    //console.log("comp");
    Alert.alert("ToDo Description", todo.description, [
      { text: "Cancel", style: "cancel" },
      {
        text: todo.isDone ? "Mark OnGoing" : "Mark Completed",
        style: "default",
        onPress: () => updateToDo({ ...todo, isDone: !todo.isDone }),
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={s.touch}
      onPress={() => {
        completeTodoAlert();
      }}
      onLongPress={deleteTodoAlert}
    >
      <Text
        style={[s.text, todo.isDone && { textDecorationLine: "line-through" }]}
      >
        {todo.title}
      </Text>
      {todo.isDone && <Image source={click} style={s.click} />}
    </TouchableOpacity>
  );
}
