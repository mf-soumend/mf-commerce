import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";
import { fetchAllProducts, Product, ProductPayload } from "src/service";
import ProductsCard from "./productsCard";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, spacing, typography } from "src/theme";
import { verticalScale as vs } from "src/utils";
import { selectSelectedCategory, useAppSelector } from "src/store";

const ProductListings = ({ showTitle = false, title = "" }) => {
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const pageLoadingState = useRef<Record<number, boolean>>({});
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const limit = 10;
  const MemoizedProductsCard = memo(ProductsCard);

  const fetchProducts = useCallback(
    async (pageNo = 0) => {
      if (pageLoadingState.current[pageNo]) return;

      pageLoadingState.current[pageNo] = true;
      try {
        const productPayload: ProductPayload = {
          limit,
          skip: pageNo * limit,
          select: ["title", "price", "thumbnail"],
          selectedCategory: selectedCategory,
        };
        const res = await fetchAllProducts(productPayload);

        setProductsData((prevData) =>
          pageNo === 0 ? res.products : [...prevData, ...res.products]
        );
        setPage(pageNo);
        setTotal(res.total);
      } catch (err) {
        setError("Something went wrong! Please refresh.");
      } finally {
        setRefreshing(false);
        pageLoadingState.current[pageNo] = false;
      }
    },
    [limit, selectedCategory]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts(0);
  }, [fetchProducts]);

  const loadMore = useCallback(() => {
    if (total > page * limit + limit) {
      fetchProducts(page + 1);
    }
  }, [fetchProducts, page, total, limit]);

  useEffect(() => {
    pageLoadingState.current = {};
    fetchProducts(0);
  }, [selectedCategory]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <MemoizedProductsCard product={item} />,
    []
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {showTitle && <Text style={styles.title}>{`${title} (${total})`}</Text>}
      <FlatList
        data={productsData}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.listWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ProductListings;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: fontSize.h3,
      fontFamily: typography.semiBold,
      paddingHorizontal: vs(spacing.lg),
      marginBottom: vs(spacing.md),
      color: colors.text,
    },
    listWrapper: {
      paddingHorizontal: vs(spacing.md),
    },
    listContainer: {
      gap: vs(spacing.md),
    },
    errorText: {
      paddingVertical: vs(spacing.sm),
      paddingHorizontal: vs(spacing.lg),
      fontFamily: typography.medium,
      color: colors.danger,
      textAlign: "center",
    },
  });
