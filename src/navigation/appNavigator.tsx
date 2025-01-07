import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { darkTheme, lightTheme } from "src/theme";
import { PrimaryNavigator } from "src/navigation/primaryNavigator";

// This prevents SplashScreen from auto hiding while the fonts are in loading state.
SplashScreen.preventAutoHideAsync();

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}
export const AppNavigator = (props: NavigationProps) => {
  const scheme = useColorScheme();
  const [fontLoaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const appTheme = useMemo(() => {
    const isDarkMode = scheme === "dark";
    return isDarkMode ? darkTheme : lightTheme;
  }, [darkTheme, lightTheme, scheme]);
  useEffect(() => {
    if (fontLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, error]);
  if (!fontLoaded && !error) {
    return null;
  }
  return (
    <NavigationContainer theme={appTheme} {...props}>
      <PrimaryNavigator {...props} />
    </NavigationContainer>
  );
};
