import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { PrimaryScreenProps } from "src/navigation";
import { getSingleProduct } from "src/service";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { useTheme } from "@react-navigation/native";
import { verticalScale as vs } from "src/utils";
import Image from "src/components/image";
import ProductDetailsPageLoader from "src/components/productDetailsPageLoader";
import Reviews from "src/components/reviews";

const ProductDetails: FC<PrimaryScreenProps<"productDetails">> = ({
  route,
}) => {
  const [product, setProduct] = useState<any>();
  const [error, setError] = useState(false);
  const { params } = route;
  const id = params.id;
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const fetchProductDetails = async () => {
    setError(false);
    getSingleProduct(id)
      .then((res) => {
        setProduct(res);
      })
      .catch(() => {
        setError(true);
      });
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);
  return product ? (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {product?.images?.length > 0 && (
        <View>
          <FlatList
            data={product.images}
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={styles.imageWrapper}>
                  <Image style={styles.productImage} src={item} />
                </View>
              );
            }}
            keyExtractor={(item, _id) => item + _id}
            horizontal
          />
        </View>
      )}
      <View style={styles.details}>
        <View>
          <Text style={styles.title}>{product?.title}</Text>
          <Text
            style={[styles.title, styles.price]}
          >{`$ ${product?.price}`}</Text>
        </View>
        <Text style={styles.description}>{product?.description}</Text>
        <View>
          <Text style={[styles.title, { marginBottom: vs(spacing.xs) }]}>
            Shipping & Returns
          </Text>
          <Text style={styles.description}>
            {product.shippingInformation ?? "N/A"}
          </Text>
          <Text style={styles.description}>
            {product.returnPolicy ?? "N/A"}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>Reviews</Text>
          <Text style={[styles.title, { fontSize: fontSize.h2 }]}>
            {`${product.rating ?? "No"} Ratings`}
          </Text>
          <Text style={styles.description}>{`${
            product?.reviews?.length ?? 0
          } Review${product?.reviews?.length > 1 ? "s" : ""}`}</Text>
          {product?.reviews.length > 0 && (
            <Reviews reviewList={product.reviews} />
          )}
        </View>
      </View>
    </ScrollView>
  ) : (
    <ProductDetailsPageLoader />
  );
};

export default ProductDetails;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: vs(spacing.md),
    },
    listContainer: {
      gap: vs(spacing.sm),
      paddingHorizontal: vs(spacing.lg),
    },
    imageWrapper: {
      height: vs(248),
      width: vs(160),
      backgroundColor: colors.card,
    },
    productImage: {
      height: vs(248),
      objectFit: "contain",
    },
    details: {
      padding: vs(spacing.lg),
      gap: vs(spacing.md),
    },
    title: {
      color: colors.text,
      fontFamily: typography.semiBold,
      fontSize: fontSize.h3,
    },
    price: {
      color: colors.primary,
    },
    description: {
      color: colors.paragraph,
      fontSize: fontSize.h4,
      fontFamily: typography.regular,
    },
  });
