import { StyleSheet } from "react-native";

export const s=StyleSheet.create({
    touch:{
        height:80,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal:10,
        borderRadius:20,
        marginVertical:3,      
    },
    click:{
        height:30,
        width:30,
    },
    text:{
        fontSize:20
    },
});