import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

export interface SkeletonProps {
  background: string;
  highlight: string;
  children: ReactElement;
  borderRadius?: number | string;
  loading?: boolean;
  width?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  children,
  background,
  highlight,
  borderRadius = 4,
  loading = true,
  width,
}) => {
  const [layout, setLayout] = React.useState<{
    width: number;
    height: number;
  } | null>(null);
  const shared = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shared.value,
      [0, 1],
      [layout ? -layout.width : 0, layout ? layout.width : 0]
    );
    return { transform: [{ translateX }] };
  });

  React.useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: 1000 }), -1);
  }, [shared]);

  if (!layout) {
    return (
      <View
        style={width ? { width: width } : {}}
        onLayout={(e) => setLayout(e.nativeEvent.layout)}
      >
        {children}
      </View>
    );
  }
  if (!loading) {
    return children;
  }

  return (
    <View style={{ width: layout.width, height: layout.height }}>
      <View
        style={[
          styles.container,
          { backgroundColor: background, borderRadius: borderRadius },
        ]}
      />
      <Animated.View style={[StyleSheet.absoluteFill, animStyle]}>
        <LinearGradient
          colors={["transparent", highlight, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <View style={StyleSheet.absoluteFill}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
});

export default Skeleton;
