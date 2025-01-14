export const shortByItem = [
  { name: "Recommended", slug: "recommended" },
  { name: "Newest", slug: "id" },
  { name: "Price - Low to High", slug: "pricelh" },
  { name: "Price - High to Low", slug: "pricehl" },
];

export const getParam = (
  slug: string
): { shortBy: string; order: "desc" | "asc" } => {
  if (slug === "id") {
    return { shortBy: "id", order: "desc" };
  } else if (slug === "pricelh") {
    return { shortBy: "price", order: "asc" };
  } else if (slug === "pricehl") {
    return { shortBy: "price", order: "desc" };
  } else {
    return { shortBy: "", order: "desc" };
  }
};
