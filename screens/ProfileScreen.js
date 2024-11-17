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

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  console.log(route);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image source={require("../assets/elder.png")} size={80} />
          <View style={{ marginRight: 20 }}>
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
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>
            +92066519
          </Text>
          <Icon name='phone' color='#FF6347' size={20} />
        </View>
        <View style={styles.row}>
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>
            ali123@email.com
          </Text>
          <Icon name='email' color='#FF6347' size={20} />
        </View>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("Map");
          }}>
          <View style={[styles.row, { marginTop: 30 }]}>
            <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "bold" }}>
              {route.params?.adress || "العوينة ,تونس"}
              <Icon name='chevron-down' color='#777777' size={20} />

            </Text>

            <Icon name='map-marker-radius' color='#FF6347' size={20} />

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
            <Text style={styles.menuItemText}>خدماتك المفضلة</Text>
            <Icon name='heart-outline' color='#FF6347' size={25} />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>خلاص</Text>
            <Icon name='credit-card' color='#FF6347' size={25} />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>مساعدة</Text>
            <Icon name='account-check-outline' color='#FF6347' size={25} />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}> تسجيل الخروج </Text>
            <Icon name='logout' color='#FF6347' size={25} />
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
    direction: "rtl",
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
    justifyContent:"space-between"
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
    justifyContent:"space-between"
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
