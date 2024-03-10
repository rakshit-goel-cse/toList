import { useEffect, useRef, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s } from "./App-style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import logo from "./assets/logo.png";
import { CardToDo } from "./cardToDo";
import { Footer } from "./Footer";
import constants from "./constants";
import { Addtodo } from "./Addtodo";

let firstRender = true;
let firstUpdate = true;
let key = "ToDoStorageKey";

export default function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(constants.all);
  const scrollRef = useRef();
  const [updateToDoState,setUpdateToDo] = useState(null);
  /*const [data, setData] = useState([
    {
      id: 1,
      title: "First Title",
      isDone: false,
      description: "Description 1",
    },
    {
      id: 2,
      title: "First 2 Title",
      isDone: true,
      description: "Description 2",
    },
    {
      id: 3,
      title: "Firstfedsf Title",
      isDone: false,
      description: "Description 3",
    },
    {
      id: 4,
      title: "First Title",
      isDone: false,
      description: "Description 4",
    },
    {
      id: 5,
      title: "First Title",
      isDone: false,
      description: "Description 1",
    },
    { id: 6, title: "First Title", isDone: true, description: "Description 1" },
    {
      id: 7,
      title: "First Title",
      isDone: false,
      description: "Description 1",
    },
    { id: 8, title: "First Title", isDone: true, description: "Description 1" },
    {
      id: 9,
      title: "First Title",
      isDone: false,
      description: "Description 1",
    },
  ]);*/

  //getDatafromStorage
  const getDatafromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      jsonValue ? setData(JSON.parse(jsonValue)) : "";
    } catch (error) {
      Alert.alert(error);
    }
    firstUpdate = false;
  };

  useEffect(() => {
    getDatafromStorage();
  }, []);

  //setDataToStorage
  const setDataToStorage = async () => {
    if (!firstRender && !firstUpdate) {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        Alert.alert(error);
      }
    } else firstRender = false;
  };
  useEffect(() => {
    setDataToStorage();
  }, [data]);

  const updateToDo = (todo) => {
    let tempData = [...data];
    let index = tempData.findIndex((t) => t.id == todo.id);
    tempData[index] = todo;
    setData(tempData);
  };

  const deleteToDo = (todo) => {
    setData(data.filter((value) => todo.id != value.id));
  };

  const addTodo = (title, desc) => {
    if (data.length == 0) {
      setData([
        {
          id: 1,
          title: title,
          isDone: false,
          description: desc,
        },
      ]);
    } else {
      setData((prevData) => [
        ...prevData,
        {
          id: 1 + prevData[prevData.length - 1].id,
          title: title,
          isDone: false,
          description: desc,
        },
      ]);
    }
    if(selected!==constants.all){
      setSelected(constants.all);
    }
    setTimeout(() => {
      scrollRef.current.scrollToEnd();
    }, 300);
  };

  const getFilterData = () => {
    switch (selected) {
      case constants.all:
        return data;
      case constants.in_progress:
        return data.filter((todo) => !todo.isDone);
      case constants.done:
        return data.filter((todo) => todo.isDone);
      default:
        return data;
    }
  };

  return (
    <View style={s.mainPage}>
      <SafeAreaProvider>
        <SafeAreaView style={s.safeArea}>
          <View style={s.header}>
            <Image source={logo} style={s.logo} resizeMode="contain" />
            <Text style={s.headerText}>You have something to do</Text>
          </View>
          <View style={s.body}>
            <ScrollView ref={scrollRef}>
              {getFilterData().map((item) => {
                return (
                  <CardToDo
                    key={item.id}
                    todo={item}
                    updateToDo={updateToDo}
                    deleteToDo={deleteToDo}
                    setUpdateToDo={setUpdateToDo}
                  />
                );
              })}
            </ScrollView>
          </View>
          <Addtodo updateToDo={updateToDoState? updateToDo:null} addTodo={addTodo} todoToUpdate={updateToDoState} setUpdateToDo={setUpdateToDo}  />
          <View style={s.footer}>
            <Footer selected={selected} setSelected={setSelected} data={data} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
