import { sanityFetch } from "@/lib/sanity/live";
import { navigationQuery } from "@/lib/sanity/queries";
import { NavigationQueryResult } from "@/lib/sanity/types";
import { linkResolver } from "@/lib/sanity/utils";

export async function getNavigation() {
  const navigation = (await sanityFetch({
    query: navigationQuery,
  })) as {
    data: NavigationQueryResult | null;
  };

  return {
    logo: navigation.data?.logo,
    title: navigation.data?.title,
    items: navigation.data?.items?.map((item) => ({
      label: item.label,
      link:
        item._type === "link" && item.link
          ? linkResolver(item.link)
          : undefined,
      items:
        item._type === "subItems"
          ? item.items?.map((subItem) => ({
              label: subItem.label,
              link:
                subItem._type === "item" && subItem.link
                  ? linkResolver(subItem.link)
                  : undefined,
            }))
          : undefined,
    })),
  };
}
