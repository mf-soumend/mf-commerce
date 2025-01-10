import {
  ActivityIndicator,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import ResultNotFound from "./resultNotFound";

const ProductListings = ({
  activateSearch = false,
  searchItem = "",
  showTitle = false,
  title = "",
  onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {},
  clamped = 0,
}) => {
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const pageLoadingState = useRef<Record<number, boolean>>({});
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors, clamped), [colors]);
  const limit = 10;
  const MemoizedProductsCard = memo(ProductsCard);

  const fetchProducts = useCallback(
    async (pageNo = 0) => {
      if (pageLoadingState.current[pageNo]) return;

      pageLoadingState.current[pageNo] = true;
      try {
        setIsLoadingMore(true);
        const productPayload: ProductPayload = {
          limit,
          skip: pageNo * limit,
          select: ["title", "price", "thumbnail"],
          selectedCategory: selectedCategory,
        };
        if (activateSearch) {
          productPayload.searchItem = searchItem;
          productPayload.selectedCategory = "all";
        }
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
        setIsLoadingMore(false);
      }
    },
    [limit, selectedCategory, searchItem]
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
  const renderLoader = () => {
    if (isLoadingMore) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    pageLoadingState.current = {};
    fetchProducts(0);
  }, [selectedCategory, searchItem]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <MemoizedProductsCard product={item} />,
    []
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  return activateSearch && total === 0 ? (
    searchItem === "" ? null : (
      <ResultNotFound />
    )
  ) : (
    <View style={styles.container}>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {showTitle && <Text style={styles.title}>{`${title} (${total})`}</Text>}
      {activateSearch && total > 0 && (
        <Text style={styles.title}>{`${total} Result${
          total > 1 ? "s" : ""
        } found`}</Text>
      )}

      <Animated.FlatList
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
        onScroll={(e) => {
          onScroll(e);
        }}
        ListFooterComponent={renderLoader}
      />
    </View>
  );
};

export default ProductListings;

const makeStyles = (colors: Colors, clamped: number) =>
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
      paddingTop: clamped,
    },
    errorText: {
      paddingVertical: vs(spacing.sm),
      paddingHorizontal: vs(spacing.lg),
      fontFamily: typography.medium,
      color: colors.danger,
      textAlign: "center",
    },
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: vs(spacing.md),
    },
  });
