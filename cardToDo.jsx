import { Image, Text, TouchableOpacity, Alert } from "react-native";
import click from "./assets/check.png";
import deleteImg from "./assets/delete.png";
import undoImg from "./assets/undo.png";
import { s } from "./cardToDo-style";
import Swipeable from 'react-native-swipeable';

export function CardToDo({ todo, updateToDo, deleteToDo }) {
  const deleteTodoAlert = () => {
    Alert.alert(
      "Delete ToDo",
      "Are you sure to delete this Todo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteToDo(todo),
        },
      ],
      { cancelable: true }
    );
  };

  const completeTodoAlert = () => {
    Alert.alert(
      "ToDo Description",
      todo.description,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: todo.isDone ? "Mark OnGoing" : "Mark Completed",
          style: "default",
          onPress: () => updateToDo({ ...todo, isDone: !todo.isDone }),
        },
      ],
      { cancelable: true }
    );
  };

  const leftContent=<Image source={todo.isDone? undoImg : click} style={s.leftContent} />

  const rightContent=<Image source={deleteImg} style={[s.leftContent,{alignSelf:'flex-start'}]} />

  return (
    <Swipeable leftContent={leftContent} rightContent={rightContent}
    onLeftActionRelease={()=>updateToDo({ ...todo, isDone: !todo.isDone })}
    onRightActionRelease={deleteTodoAlert}>
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
    </Swipeable>
  );
}
