import { Dimensions, Platform } from "react-native";

// Retrieve the width and height of the window
const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
let guidelineBaseWidth = 393;
let guidelineBaseHeight = 852;

// Adjust guideline base sizes for iPad and Android tablets
if (Platform.OS === "ios" && shortDimension > 600) {
  // iPad
  guidelineBaseWidth = 768;
  guidelineBaseHeight = 1024;
} else if (Platform.OS === "android" && shortDimension > 600) {
  // Android tablets
  guidelineBaseWidth = 600;
  guidelineBaseHeight = 960;
}
export const verticalScale = (size: number): number =>
  Math.round((longDimension / guidelineBaseHeight) * size);
