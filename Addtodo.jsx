import { Text, TouchableOpacity } from "react-native";
import { s } from "./Addtodo-style";
import Dialog from "react-native-dialog";
import { useRef, useState } from "react";

export const Addtodo = ({ addTodo }) => {
  const [showDia, setShowDia] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleNull, setTitleNull] = useState(false);
  const ref = useRef(null);

  const addTitle = (temp) => {
    console.log(temp === " " && title === "");
    temp === " " && title === "" ? "" : setTitle(temp);
  };

  const pressAdd = () => {
    title !== ""
      ? (addTodo(title, description),
        setTitle(""),
        setDescription(""),
        setShowDia(false),
        setTitleNull(false))
      : (setTitleNull(true), ref.current.focus());
  };

  const pressCancel = () => {
    setShowDia(false), setTitle(""), setDescription(""), setTitleNull(false);
  };

  return (
    <>
      <Dialog.Container style={s.dialog} visible={showDia}>
        <Dialog.Title>Add Todo</Dialog.Title>
        <Dialog.Description>Add Details to add new todo.</Dialog.Description>

        <Dialog.Input
          textInputRef={ref}
          label="Title"
          value={title}
          onChange={(event) => addTitle(event.nativeEvent.text)}
        />

        {titleNull && (
          <Dialog.Description style={{ color: "red", fontSize: 8 }}>
            Title can not be empty
          </Dialog.Description>
        )}

        <Dialog.Input
          label="Description"
          onChange={(temp) => setDescription(temp.nativeEvent.text)}
        />
        <Dialog.Button label="Cancel" onPress={() => pressCancel()} />
        <Dialog.Button label="Add" onPress={() => pressAdd()} />
      </Dialog.Container>

      <TouchableOpacity style={s.btn} onPress={() => setShowDia(true)}>
        <Text style={s.text}>+ ToDo</Text>
      </TouchableOpacity>
    </>
  );
};
