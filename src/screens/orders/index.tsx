import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useMemo, useState } from "react";
import { useAppSelector } from "src/store";
import { selectOrder } from "src/store/slices/orderSlice";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { ordersCategory, verticalScale as vs } from "src/utils";
import ResultNotFound from "src/components/resultNotFound";
import { ArrowRight2, Receipt1 } from "iconsax-react-native";
import { PrimaryParamList, TabScreenProps } from "src/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Orders: FC<TabScreenProps<"orders">> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PrimaryParamList>>();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const orders = useAppSelector(selectOrder);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyle(colors), []);
  const selectedOrders = useMemo(() => {
    return orders
      ?.filter(
        (item: any) =>
          item.status === selectedCategory || selectedCategory === "All"
      )
      .reverse();
  }, [selectedCategory, orders]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
      </View>
      {!!orders ? (
        orders.length === 0 ? (
          <ResultNotFound
            title="No Orders yet."
            source={require("assets/no-orders.png")}
          />
        ) : (
          <>
            <View style={styles.ordersCategorySection}>
              <FlatList
                data={ordersCategory}
                renderItem={({ item }) => {
                  return (
                    <Text
                      onPress={() => {
                        setSelectedCategory(item);
                      }}
                      style={[
                        styles.category,
                        selectedCategory === item
                          ? styles.selectedCategory
                          : {},
                      ]}
                      key={item}
                    >
                      {item}
                    </Text>
                  );
                }}
                keyExtractor={(item) => item}
                horizontal
                contentContainerStyle={styles.categoryList}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.orderListSection}>
              <FlatList
                data={selectedOrders}
                renderItem={({ item }) => {
                  return (
                    <View key={item.id}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("orderDetails", { id: item.id });
                        }}
                        style={styles.orderCard}
                      >
                        <Receipt1
                          size={vs(spacing.lg)}
                          color={colors.text}
                          variant="Broken"
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.orderName}>Order #{item.id}</Text>
                          <Text style={styles.description}>
                            {`${item.items} item${item.items > 1 ? "s" : ""}`}
                          </Text>
                        </View>
                        <ArrowRight2
                          size={vs(spacing.lg)}
                          color={colors.text}
                          variant="Broken"
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.orderList}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        )
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

export default Orders;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: vs(100),
      justifyContent: "flex-end",
    },
    headerTitle: {
      fontSize: fontSize.h3,
      fontFamily: typography.bold,
      color: colors.text,
      textAlign: "center",
      marginBottom: vs(spacing.sm),
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    ordersCategorySection: {
      paddingVertical: vs(spacing.lg),
    },
    categoryList: { gap: vs(spacing.sm), paddingHorizontal: vs(spacing.lg) },
    category: {
      paddingHorizontal: vs(spacing.sm),
      paddingVertical: vs(spacing.xxs),
      backgroundColor: colors.backgroundSecondary,
      color: colors.text,
      borderRadius: vs(100),
      fontSize: fontSize.body2,
      fontFamily: typography.medium,
      lineHeight: vs(spacing.lg),
    },
    selectedCategory: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    orderListSection: {
      flex: 1,
      paddingHorizontal: vs(spacing.lg),
    },
    orderList: {
      gap: vs(spacing.sm),
    },
    orderCard: {
      padding: vs(spacing.md),
      backgroundColor: colors.backgroundSecondary,
      borderRadius: vs(spacing.xs),
      flexDirection: "row",
      gap: vs(spacing.md),
      alignItems: "center",
    },
    orderName: {
      fontSize: fontSize.h3,
      fontFamily: typography.medium,
      color: colors.text,
    },
    description: {
      fontSize: fontSize.body2,
      fontFamily: typography.regular,
      color: colors.textSecondary,
    },
  });
