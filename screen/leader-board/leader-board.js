import React,{memo} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { fetchUser } from "../user/hook";

const LBoard = () => {
let userList = fetchUser();
userList = userList && userList.sort((a,b)=> b?.score - a?.score)

  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Score</Text>
      <FlatList 
      data={userList}
      renderItem={({item})=>{
        return(
            <View key ={item.email} style={styles.renderItemContainer}>
                <Text style={styles.title}>{item.email}{", "}</Text> 
                <Text style={styles.title}>{item?.score} 🎯</Text>
            </View>
        )
      }}
      keyExtractor={item=> item.email}
      />
    </View>
  );
};

export default memo(LBoard);

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  loading: {
    fontSize: 20,
    fontWeight: 600,
    color: "#000",
    alignSelf:'center',
    textTransform:'uppercase',
    marginVertical:20,
  },
  renderItemContainer:{
    flex:1,
    flexDirection:"row",
    borderWidth:1,
    marginVertical:5,
    padding:10,
    justifyContent:"space-between",
    alignItems:'center',
    borderRadius:5,
    borderColor:'lightgrey'
},
title:{
    fontSize:16,
    fontWeight:600,
}
});
