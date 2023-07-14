import { Feather } from "@expo/vector-icons";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, StyleSheet } from "react-native";
import { PortalProvider } from "@gorhom/portal";

import Overview from "../screens/overview";
import Details from "../screens/details";
import useAnimatedValues from "../hooks/use-animated-values";
import Home from "../screens/overview";
import DetailScreen from "../screens/details";
import { DetailScreenProvider } from "../context/detail-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

export type RootStackParamList = {
  Home: undefined;
  Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { animatedRef, pageX, pageY, active, headerHeight } =
  useAnimatedValues();

  return (
    <SafeAreaProvider>
      <PortalProvider>
        <View
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <DetailScreenProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  gestureEnabled: true,
                }}
              >
                <Stack.Screen
                  name="Home"
                  component={(props: { route: RouteProp<RootStackParamList, "Home">; navigation: any; }) => (
                    <Home animatedRef={animatedRef} pageX={pageX} pageY={pageY} active={active} headerHeight={headerHeight} {...props} />
                  )}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <DetailScreen
              {...{
                active,
                pageX,
                pageY,
                headerHeight,
              }}
            />
          </DetailScreenProvider>
        </View>
      </PortalProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row"
  },
  backButtonText: {
    color: "#007AFF",
    marginLeft: 4
  }
});