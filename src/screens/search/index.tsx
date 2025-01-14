import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useEffect, useCallback, useState, useRef } from "react";
import { PrimaryScreenProps } from "src/navigation";
import Input from "src/components/input";
import { verticalScale as vs, shortByItem } from "src/utils";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { ArrowDown2, CloseCircle, SearchNormal1 } from "iconsax-react-native";
import { useTheme } from "@react-navigation/native";
import ProductListings from "src/components/productListings";
import BottomSheet, { BottomSheetRef } from "src/components/bottomSheet";

const screenWidth = Dimensions.get("window").width;

const Search: FC<PrimaryScreenProps<"search">> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<any>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [shortBy, setShortBy] = useState<{ name: string; slug: string } | null>(
    shortByItem[0]
  );

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.toggleSwitch();
  };
  const clearShortBy = () => {
    setShortBy(null);
  };

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
    setSearchTerm(value);
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
                color={colors.text}
                variant="Broken"
              />
            )}
            onPress={() => {
              inputRef.current?.focus();
            }}
            onChangeText={(value) => {
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
      <ScrollView
        horizontal
        style={styles.filter}
        showsHorizontalScrollIndicator={false}
      >
        <Pressable style={styles.shortByButton} onPress={handleOpenBottomSheet}>
          <Text style={styles.btnText}>Short by</Text>
          <ArrowDown2
            size={vs(spacing.md)}
            variant="Broken"
            color={colors.text}
          />
        </Pressable>
        {!!shortBy && (
          <Pressable
            style={[styles.shortByButton, { backgroundColor: colors.primary }]}
            onPress={clearShortBy}
          >
            <Text style={styles.btnText}>{shortBy?.name}</Text>
            <CloseCircle
              size={vs(spacing.md)}
              variant="Broken"
              color={colors.text}
            />
          </Pressable>
        )}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        header={
          <View style={styles.bottomSheetHeader}>
            <Pressable
              style={{
                width: 70,
              }}
              onPress={clearShortBy}
            >
              <Text
                style={[styles.bottomSheetHeaderBtnText, { textAlign: "left" }]}
              >
                Clear
              </Text>
            </Pressable>
            <Text style={styles.bottomSheetHeaderTitle}>Short by</Text>
            <Pressable
              style={{
                width: 70,
              }}
              onPress={handleOpenBottomSheet}
            >
              <Text style={styles.bottomSheetHeaderBtnText}>X</Text>
            </Pressable>
          </View>
        }
      >
        <View>
          {shortByItem.map((item) => {
            return (
              <Pressable
                key={item.slug}
                onPress={() => {
                  setShortBy(item);
                }}
                style={[
                  styles.optionsBtn,
                  shortBy?.slug === item.slug
                    ? { backgroundColor: colors.primary }
                    : {},
                ]}
              >
                <Text style={styles.optionsBtnText}>{item.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </BottomSheet>
      <ProductListings
        activateSearch
        searchItem={searchTerm}
        shortBy={shortBy?.slug}
      />
    </View>
  );
};

export default Search;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
    filter: {
      paddingLeft: vs(spacing.lg),
      paddingVertical: vs(spacing.sm),
      marginBottom: vs(spacing.xs),
      maxHeight: vs(spacing.xxl),
    },
    shortByButton: {
      marginRight: vs(spacing.sm),
      height: vs(spacing.lg),
      flexDirection: "row",
      alignItems: "center",
      gap: vs(spacing.xs),
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: vs(spacing.xs),
      paddingVertical: vs(spacing.xxs),
      borderRadius: vs(spacing.xxxl),
    },
    btnText: {
      color: colors.text,
      fontSize: fontSize.h4,
    },
    bottomSheetHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: vs(spacing.md),
      alignItems: "center",
      marginBottom: vs(spacing.md),
    },
    bottomSheetHeaderTitle: {
      color: colors.text,
      fontFamily: typography.semiBold,
      fontSize: fontSize.h2,
      includeFontPadding: false,
    },
    bottomSheetHeaderBtnText: {
      color: colors.text,
      fontFamily: typography.regular,
      fontSize: fontSize.h3,
      includeFontPadding: false,
      textAlign: "right",
    },
    optionsBtn: {
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: vs(spacing.xl),
      paddingVertical: vs(spacing.md),
      borderRadius: vs(spacing.xxxl),
      marginBottom: vs(spacing.md),
      flexDirection: "row",
      alignItems: "center",
    },
    optionsBtnText: {
      color: colors.text,
      fontFamily: typography.regular,
      fontWeight: 500,
      fontSize: fontSize.h3,
      includeFontPadding: false,
    },
  });
