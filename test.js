import React from "react";
import { Text, View, Button } from "react-native";
import I18n, { changeLanguage } from "./i18n";

const ExampleScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{I18n.t("home.greeting")}</Text>
      <Button title="Switch to Arabic" onPress={() => changeLanguage("ar")} />
      <Button title="Switch to English" onPress={() => changeLanguage("en")} />
    </View>
  );
};

export default ExampleScreen;
