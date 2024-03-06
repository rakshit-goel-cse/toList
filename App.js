import {  Image, ScrollView, Text, View } from 'react-native';
import {s} from './App-style';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import logo from './assets/logo.png';
import { CardToDo } from './cardToDo';
import { useState } from 'react';
export default function App() {

  const [data,setData]=useState([
    {id:1,title:"First Title",isDone:false},
    {id:2,title:"First 2 Title",isDone:true},
    {id:3,title:"Firstfedsf Title",isDone:false},
    {id:4,title:"First Title",isDone:false},
    {id:5,title:"First Title",isDone:false},
    {id:6,title:"First Title",isDone:true},
    {id:7,title:"First Title",isDone:false},
    {id:8,title:"First Title",isDone:true},
    {id:9,title:"First Title",isDone:false},
  ]);

  const updateToDo = (todo) =>{
    let tempData=[...data];
    let index=tempData.findIndex((t)=>t.id==todo.id);
    tempData[index]=todo;
    setData(tempData);
  }

  return (
    <View style={s.mainPage}>
    <SafeAreaProvider>
      <SafeAreaView style={s.safeArea}>
        <View style={s.header}>
          <Image source={logo} style={s.logo} resizeMode='contain'/>
          <Text style={s.headerText}>You have something to do</Text>
        </View>
        <View style={s.body}>
          <ScrollView>
          {data.map((item)=>{return(<CardToDo key={item.id} todo={item} updateToDo={updateToDo}/>)})}
          </ScrollView>
        </View>
        <Text style={s.footer}>footer</Text>
      </SafeAreaView>
    </SafeAreaProvider>
    </View>
  );
}

