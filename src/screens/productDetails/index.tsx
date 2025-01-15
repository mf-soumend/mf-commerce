import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useEffect, useMemo, useState } from "react";
import { PrimaryScreenProps } from "src/navigation";
import { getSingleProduct } from "src/service";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { useTheme } from "@react-navigation/native";
import { verticalScale as vs } from "src/utils";
import Image from "src/components/image";
import ProductDetailsPageLoader from "src/components/productDetailsPageLoader";
import Reviews from "src/components/reviews";
import QuantityTab from "src/components/quantityTab";
import AddToCartBtn from "src/components/floatingButton";
import { useAppDispatch } from "src/store";
import { addToCart } from "src/store/slices/cartSlice";

const ProductDetails: FC<PrimaryScreenProps<"productDetails">> = ({
  route,
}) => {
  const [product, setProduct] = useState<any>();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const { params } = route;
  const id = params.id;
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const totalPrice = useMemo(() => {
    return (product?.price * quantity).toFixed(2);
  }, [quantity, product]);
  const fetchProductDetails = async () => {
    setError(false);
    getSingleProduct(id)
      .then((res) => {
        setProduct(res);
        setQuantity(res?.minimumOrderQuantity ?? 1);
      })
      .catch(() => {
        setError(true);
      });
  };
  const addToCartFn = () => {
    dispatch(
      addToCart({
        productId: product.id,
        quantity: quantity,
        price: product.price,
        name: product.title,
        thumbnail: product.thumbnail,
      })
    );
    Alert.alert(`${product.title} added to cart`);
    setQuantity(product.minimumOrderQuantity);
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);
  return product ? (
    <View style={styles.containerWrapper}>
      <View style={styles.scrollViewWrapper}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
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
            <QuantityTab
              minQuantity={product?.minimumOrderQuantity ?? 1}
              quantity={quantity}
              setQuantity={setQuantity}
            />
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
      </View>
      <AddToCartBtn
        title={
          <>
            <Text style={styles.addToBagText}>{`$${totalPrice}`}</Text>
            <Text style={styles.addToBagText}>{`Add to Bag`}</Text>
          </>
        }
        onPress={addToCartFn}
      />
    </View>
  ) : (
    <ProductDetailsPageLoader />
  );
};

export default ProductDetails;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    containerWrapper: {
      flex: 1,
      position: "relative",
      paddingTop: vs(spacing.md),
    },
    scrollViewWrapper: { height: "95%", width: "100%" },
    container: {
      flex: 1,
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
      paddingBottom: vs(spacing.xxxl),
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
    addToBagText: {
      color: colors.white,
      fontFamily: typography.medium,
      fontSize: fontSize.h3,
    },
  });
