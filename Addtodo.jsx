import { Text, TouchableOpacity } from "react-native";
import { s } from "./Addtodo-style";
import Dialog from "react-native-dialog";
import { useEffect, useRef, useState } from "react";


export const Addtodo = ({ addTodo,updateToDo,todoToUpdate,setUpdateToDo }) => {
  const [showDia, setShowDia] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleNull, setTitleNull] = useState(false);
  const ref = useRef(null);

  const settingShowDiaFalse=()=>{
    setShowDia(false);
    todoToUpdate?setUpdateToDo(null):''
  }

  const callUpdateToDoUpdates=() => {
      console.info("inside todo");
      setTitle(todoToUpdate.title);
      setDescription(todoToUpdate.description);
      setShowDia(true);
  }

  const addTitle = (temp) => {
    temp === " " && title === "" ? "" : setTitle(temp);
  };

  const callUpdateTodo=()=>{
    updateToDo({ ...todoToUpdate, title: title, description:description, isDone:false });
  }

  const pressAdd = () => {
    title !== ""
      ? (todoToUpdate?callUpdateTodo():addTodo(title, description),
        setTitle(""),
        setDescription(""),
        settingShowDiaFalse(),
        setTitleNull(false))
      : (setTitleNull(true), ref.current.focus());
  };

  const pressCancel = () => {
    settingShowDiaFalse(), setTitle(""), setDescription(""), setTitleNull(false);
  };

  return (
    <>
    {todoToUpdate && !showDia? callUpdateToDoUpdates():''}
      <Dialog.Container
        style={s.dialog}
        visible={showDia}
        onBackdropPress={() => settingShowDiaFalse()}
        onRequestClose={() => settingShowDiaFalse()}
      >
        <Dialog.Title style={{color:"#3F7FEF"}}>{todoToUpdate?"Update ToDo":"Add Todo"}</Dialog.Title>
        <Dialog.Description style={{color:"#2F96E5"}}>{todoToUpdate?"Update Details Of the ToDo.":"Add Details to add new todo."}</Dialog.Description>

        <Dialog.Input
          textInputRef={ref}
          label="Title"
          unstableLabelStyle = {{color:'black'}}
          value={title}
          style={{color:"black"}}
          onChange={(event) => addTitle(event.nativeEvent.text)}
        />

        {titleNull && (
          <Text style={{ color: "red", fontSize: 8, marginTop: -20 }}>
            Title can not be empty
          </Text>
        )}

        <Dialog.Input
          label="Description"
          unstableLabelStyle = {{color:'black'}}
          value={description}
          style={{color:"black"}}
          onChange={(temp) => setDescription(temp.nativeEvent.text)}
        />
        <Dialog.Button label="Cancel" onPress={() => pressCancel()} />
        <Dialog.Button label={todoToUpdate?"Update":"Add"} onPress={() => pressAdd()} />
      </Dialog.Container>

      {todoToUpdate?'':
      <TouchableOpacity style={s.btn} onPress={() => setShowDia(true)}>
        <Text style={s.text}>+ ToDo</Text>
      </TouchableOpacity>
      } 
    </>
  );
};
