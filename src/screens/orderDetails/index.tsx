import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useMemo, useState } from "react";
import { PrimaryScreenProps } from "src/navigation";
import { useAppSelector } from "src/store";
import { selectOrder } from "src/store/slices/orderSlice";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";
import { Receipt1 } from "iconsax-react-native";
import Image from "src/components/image";

const OrderDetails: FC<PrimaryScreenProps<"orderDetails">> = ({ route }) => {
  const { id } = route.params;
  const [expanded, setExpanded] = useState(false);
  const orders = useAppSelector(selectOrder);
  const orderDetails = useMemo(() => {
    return orders.find((item: any) => item.id === id);
  }, []);

  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View>
          <Text style={styles.title}>Order Items</Text>
          <View style={styles.itemsCard}>
            <View style={styles.itemsCardHeader}>
              <Receipt1
                size={vs(spacing.lg)}
                color={colors.text}
                variant="Broken"
              />
              <Text style={styles.items}>{`${orderDetails.items} item${
                orderDetails.items > 1 ? "s" : ""
              }`}</Text>
              <TouchableOpacity onPress={() => setExpanded((val) => !val)}>
                <Text style={styles.viewAllBtn}>View All</Text>
              </TouchableOpacity>
            </View>
            {expanded &&
              orderDetails.cartData.map((item: any) => {
                return (
                  <View key={item.productId} style={styles.cartCardContainer}>
                    <View style={styles.imageWrapper}>
                      {item.thumbnail ? (
                        <Image
                          style={styles.productImage}
                          src={item.thumbnail}
                        />
                      ) : (
                        <Image
                          style={styles.productImage}
                          source={require("assets/dummyProduct.png")}
                        />
                      )}
                    </View>
                    <View style={styles.detailsWrapper}>
                      <View style={styles.details}>
                        <Text numberOfLines={1} style={styles.items}>
                          {item.name}
                        </Text>
                        <Text style={styles.totalPrice}>
                          {`$${(item.price * item.quantity).toFixed(2)}`}
                        </Text>
                      </View>
                      <View style={styles.quantity}>
                        <Text style={styles.quantityValue}>
                          Qt. {item.quantity}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
        <View>
          <Text style={styles.title}>Shipping details</Text>
          <View style={styles.shippingCard}>
            <Text style={[styles.items, { fontSize: fontSize.body2 }]}>
              {orderDetails.address}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    container: {
      paddingHorizontal: vs(spacing.xl),
      paddingVertical: vs(spacing.md),
      gap: vs(spacing.lg),
    },
    title: {
      fontSize: fontSize.h3,
      color: colors.text,
      fontFamily: typography.bold,
      marginBottom: vs(spacing.xs),
    },
    items: {
      fontSize: fontSize.body,
      color: colors.text,
      fontFamily: typography.regular,
      lineHeight: vs(20),
      flex: 1,
    },
    itemsCard: {
      padding: vs(spacing.md),
      backgroundColor: colors.backgroundSecondary,
      borderRadius: vs(spacing.xs),
      gap: vs(spacing.xs),
    },
    itemsCardHeader: {
      flexDirection: "row",
      gap: vs(spacing.md),
      alignItems: "center",
    },
    shippingCard: {
      padding: vs(spacing.md),
      backgroundColor: colors.backgroundSecondary,
      borderRadius: vs(spacing.xs),
      flexDirection: "row",
      gap: vs(spacing.md),
      alignItems: "center",
    },
    viewAllBtn: {
      fontSize: fontSize.body2,
      color: colors.primary,
      fontFamily: typography.medium,
    },
    cartCardContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: vs(spacing.xs),
      padding: vs(spacing.xs),
      backgroundColor: colors.background,
      borderRadius: vs(spacing.xs),
    },
    imageWrapper: {
      height: vs(spacing.xxl),
      width: vs(spacing.xxl),
      overflow: "hidden",
      backgroundColor: colors.card,
    },
    productImage: {
      height: vs(spacing.xxl),
      objectFit: "contain",
    },
    detailsWrapper: {
      flex: 1,
      gap: vs(spacing.xxs),
    },
    details: {
      flexDirection: "row",
      gap: vs(spacing.lg),
    },
    quantity: {
      flexDirection: "row",
      alignItems: "center",
    },
    totalPrice: {
      fontSize: fontSize.h4,
      fontFamily: typography.semiBold,
      color: colors.text,
    },
    quantityValue: {
      fontSize: fontSize.h4,
      fontFamily: typography.medium,
      color: colors.text,
    },
  });
