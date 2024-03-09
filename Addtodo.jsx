import { Text, TouchableOpacity } from "react-native";
import { s } from "./Addtodo-style";
import Dialog from "react-native-dialog";
import { useState } from "react";

export const Addtodo = ({ addTodo }) => {
  const [showDia, setShowDia] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <Dialog.Container style={s.dialog} visible={showDia}>
        <Dialog.Title>Add Todo</Dialog.Title>
        <Dialog.Description>Add Details to add new todo.</Dialog.Description>
        <Dialog.Input
          label="Title"
          onChange={(event) => setTitle(event.nativeEvent.text)}
        />
        <Dialog.Input
          label="Description"
          onChange={(temp) => setDescription(temp.nativeEvent.text)}
        />
        <Dialog.Button label="Cancel" onPress={() => setShowDia(false)} />
        <Dialog.Button
          label="Add"
          onPress={() => {
            title !== "" ? addTodo(title, description) : "";
            setTitle("");
            setDescription("");
            setShowDia(false);
          }}
        />
      </Dialog.Container>

      <TouchableOpacity style={s.btn} onPress={() => setShowDia(true)}>
        <Text style={s.text}>+ ToDo</Text>
      </TouchableOpacity>
    </>
  );
};
