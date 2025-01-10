import { Image as Img } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Skeleton from "./skeleton";

const Image = (props: any) => {
  const [loaded, setLoaded] = useState(false);
  const { colors } = useTheme();

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <Skeleton
      background={colors.card}
      highlight={colors.background}
      loading={!loaded}
    >
      <Img {...props} onLoad={handleLoad} />
    </Skeleton>
  );
};

export default Image;
