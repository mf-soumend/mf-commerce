import React, { Dispatch, SetStateAction, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { useTheme } from "@react-navigation/native";
import { verticalScale as vs } from "src/utils";
import { Add, Minus } from "iconsax-react-native";

interface QuantityTabProps {
  minQuantity?: number;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const QuantityTab = ({
  minQuantity = 1,
  quantity,
  setQuantity,
}: QuantityTabProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyle(colors), [colors]);

  return (
    <>
      <View style={styles.quantityTab}>
        <Text style={styles.quantityValue}>Quantity</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() =>
              setQuantity((prev) => Math.max(minQuantity, prev - 1))
            }
          >
            <Minus
              size={vs(spacing.md)}
              color={colors.white}
              variant="Broken"
            />
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setQuantity((prev) => prev + 1)}
          >
            <Add size={vs(spacing.md)} color={colors.white} variant="Broken" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default QuantityTab;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    quantityTab: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: vs(100),
      backgroundColor: colors.backgroundSecondary,
      paddingVertical: vs(spacing.xs),
      paddingHorizontal: vs(spacing.md),
      gap: vs(spacing.lg),
    },
    controls: {
      flexDirection: "row",
      alignItems: "center",
      gap: vs(spacing.lg),
    },
    controlButton: {
      padding: vs(spacing.sm),
      backgroundColor: colors.primary,
      borderRadius: "100%",
    },
    quantityValue: {
      fontSize: fontSize.h3,
      fontFamily: typography.medium,
      color: colors.text,
    },
  });
