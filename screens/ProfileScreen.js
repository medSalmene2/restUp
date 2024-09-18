import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileScreen = ({route}) => {
  const navigation = useNavigation();
  console.log(route);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image source={require("../assets/elder.png")} size={80} />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              علي بن محمود
            </Title>
            <Caption style={styles.caption}>سي علي</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name='phone' color='#777777' size={20} />
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>
            +92066519
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name='email' color='#777777' size={20} />
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>
            ali123@email.com
          </Text>
        </View>
        <TouchableRipple onPress={()=>{navigation.navigate("Map")}}>
          <View style={[styles.row,{marginTop:30}]}>
            <Icon name='map-marker-radius' color='#777777' size={20} />
            <Text style={{  marginLeft: 20, fontSize: 18,fontWeight:"bold" }}>
            {route.params?.adress || "العوينة ,تونس"}
            </Text>
            <Icon name='chevron-down' color='#777777' size={20} />
          </View>
        </TouchableRipple>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}>
          <Title>--</Title>
          {/* <Caption>Wallet</Caption> */}
        </View>
        <View style={styles.infoBox}>
          <Title>--</Title>
          {/* <Caption>Orders</Caption> */}
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name='heart-outline' color='#FF6347' size={25} />
            <Text style={styles.menuItemText}>خدماتك المفضلة</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name='credit-card' color='#FF6347' size={25} />
            <Text style={styles.menuItemText}>خلاص</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name='account-check-outline' color='#FF6347' size={25} />
            <Text style={styles.menuItemText}>مساعدة</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name='logout' color='#FF6347' size={25} />
            <Text style={styles.menuItemText}> تسجيل الخروج </Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    backgroundColor: "#FAF8F1",
    height: 100,
    borderRadius: 10,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
export default ProfileScreen;
