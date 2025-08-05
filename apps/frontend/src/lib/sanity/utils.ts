import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId, studioUrl } from "@/lib/sanity/api";
import { createDataAttribute, CreateDataAttributeProps } from "next-sanity";
import { getImageDimensions } from "@sanity/asset-utils";
import { Link } from "./types";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageRef = source?.asset?._ref;
  const crop = source.crop;

  // get the image's og dimensions
  const { width, height } = getImageDimensions(imageRef);

  if (Boolean(crop)) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

    const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

    // compute the cropped image's position
    const left = Math.floor(width * crop.left);
    const top = Math.floor(height * crop.top);

    // gather into a url
    return imageBuilder
      ?.image(source)
      .rect(left, top, croppedWidth, croppedHeight)
      .auto("format");
  }

  return imageBuilder?.image(source).auto("format");
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

const linkResolverInternal = (link: Link, internalSlug?: string) => {
  switch (link.type) {
    case "internal": {
      return { url: internalSlug, target: "_self" };
    }
    case "external": {
      return { url: link.url, target: link.blank ? "_blank" : "_self" };
    }
    case "phone": {
      return { url: `tel:${link.phone}`, target: "_self" };
    }
    case "email": {
      return { url: `mailto:${link.email}`, target: "_self" };
    }
    default: {
      console.warn("Unknown link type", link);
      return undefined;
    }
  }
};

export const linkResolver = (sanityLink: {
  text?: string | null;
  type: string;
  internalLink?: { slug: { current: string } } | null;
  url?: string | null;
  email?: string | null;
  phone?: string | null;
  value?: string | null;
  blank?: boolean | null;
  parameters?: string | null;
  anchor?: string | null;
}) => {
  const link: Link = {
    _type: "link",
    text: sanityLink.text ?? undefined,
    type: sanityLink.type,
    url: sanityLink.url ?? undefined,
    email: sanityLink.email ?? undefined,
    phone: sanityLink.phone ?? undefined,
    value: sanityLink.value ?? undefined,
    blank: sanityLink.blank ?? undefined,
    parameters: sanityLink.parameters ?? undefined,
    anchor: sanityLink.anchor ?? undefined,
  };

  return linkResolverInternal(link, sanityLink.internalLink?.slug?.current);
};

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, "id" | "type" | "path">>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}
