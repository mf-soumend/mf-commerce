import React, {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useState,
} from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewProps,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Colors, spacing } from "src/theme";
import { verticalScale as vs } from "src/utils";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

interface BottomSheetProps {
  header?: ReactElement;
  children: ReactElement;
  containerStyle?: StyleProp<ViewProps>;
}

export interface BottomSheetRef {
  toggleSwitch: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ header, children, containerStyle }, ref) => {
    const { colors } = useTheme();
    const styles = makeStyle(colors);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSwitch = () => {
      Keyboard.dismiss();
      setIsOpen((prev) => !prev);
    };

    useImperativeHandle(ref, () => ({
      toggleSwitch,
    }));

    if (!isOpen) return null;

    return (
      <>
        <AnimatedPressable
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.backdrop}
          onPress={toggleSwitch}
        />
        <Animated.View
          entering={SlideInDown.stiffness(6)}
          exiting={SlideOutDown}
          style={[styles.sheet, containerStyle]}
        >
          {!!header ? header : null}
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </>
    );
  }
);

export default BottomSheet;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.backdrop,
      zIndex: 1,
    },
    sheet: {
      backgroundColor: colors.background,
      paddingHorizontal: vs(spacing.lg),
      paddingVertical: vs(spacing.md),
      height: "50%",
      width: "100%",
      position: "absolute",
      bottom: 0,
      borderTopStartRadius: vs(spacing.md),
      borderTopEndRadius: vs(spacing.md),
      zIndex: 2,
    },
    scrollContainer: {
      flex: 1,
    },
    contentContainer: {
      paddingBottom: vs(spacing.md),
    },
  });
