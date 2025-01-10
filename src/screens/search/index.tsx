import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useCallback, useState, useRef } from "react";
import { PrimaryScreenProps } from "src/navigation";
import Input from "src/components/input";
import { verticalScale as vs } from "src/utils";
import { Colors, fontSize, spacing } from "src/theme";
import { SearchNormal1 } from "iconsax-react-native";
import { useTheme } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const Search: FC<PrimaryScreenProps<"search">> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<any>(null);

  const { colors } = useTheme();
  const styles = makeStyle(colors);

  // Debounce function
  const debounce = useCallback(
    (callback: (value: string) => void, delay: number) => {
      let timer: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(value), delay);
      };
    },
    []
  );

  // Debounced search handler
  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // Add your API call or search logic here
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.searchWrapper}>
          <Input
            ref={inputRef}
            placeholder="Search"
            containerStyle={styles.inputContainer}
            style={styles.input}
            leftIcon={() => (
              <SearchNormal1
                size={spacing.md}
                color={colors.tertiary}
                variant="Broken"
              />
            )}
            autoFocus
            onChangeText={(value) => {
              setSearchTerm(value);
              debouncedHandleSearch(value);
            }}
          />
        </View>
      ),
    });
    // Focus the input field programmatically
    setTimeout(() => {
      if (inputRef.current?.focus) {
        inputRef.current.focus();
      }
    }, 100); // Slight delay to ensure navigation and rendering is complete
  }, [navigation, debouncedHandleSearch]);

  return (
    <View style={styles.container}>
      <Text>Search Term: {searchTerm}</Text>
    </View>
  );
};

export default Search;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    searchWrapper: {
      width: screenWidth - vs(100),
      marginTop: vs(spacing.xxl),
      marginBottom: vs(spacing.sm),
      marginRight: vs(spacing.xxs),
    },
    inputContainer: {
      borderRadius: 100,
      overflow: "hidden",
      height: vs(40),
    },
    input: {
      fontSize: fontSize.h4,
    },
  });
