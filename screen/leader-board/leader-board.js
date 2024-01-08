import React,{memo} from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { fetchUser } from "../user/hook";
import { dynamicStyle } from "../user/styles";
import { DeviceOs } from "../../config/common";

const LBoard = () => {
let userList = fetchUser() || [];
userList = userList?.sort((a,b)=> b?.score - a?.score)


  return (
    <View style={styles.container}>
      <Text style={[styles.leaderBoard, DeviceOs ==="ios" ? dynamicStyle.f600:null]}>Score</Text>
     {userList && <FlatList 
      data={userList}
      renderItem={({item})=>{
        return(
            <View key ={item.email} style={styles.renderItemContainer}>
                <Text style={[styles.title, DeviceOs ==="ios" ? dynamicStyle.f600:null]}>{isNaN(item.email)? item.email : item.fullname}{", "}</Text> 
                <Text style={[styles.title, DeviceOs ==="ios" ? dynamicStyle.f600:null]}>{item?.score} 🎯</Text>
            </View>
        )
      }}
      keyExtractor={item=> item.email}
      />}
    </View>
  );
};

export default memo(LBoard);

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  leaderBoard: {
    fontSize: 20,
    color: "#000",
    alignSelf:"center",
    textTransform:"uppercase",
    marginVertical:20,
  },
  renderItemContainer:{
    flex:1,
    flexDirection:"row",
    borderWidth:1,
    marginVertical:5,
    padding:10,
    justifyContent:"space-between",
    alignItems:"center",
    borderRadius:5,
    borderColor:"lightgrey"
},
title:{
    fontSize:16,
}
});
