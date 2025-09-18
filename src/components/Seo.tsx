import { Helmet } from "react-helmet-async";

type SeoProps = {
  title?: string;
  description?: string;
  /** path like "/services" (used for canonical + og:url) */
  path?: string;
  image?: string; // absolute or root-relative (/og-image.jpg)
  noindex?: boolean;
};

const SITE_URL = "https://ruthram360.com"; // change if needed
const DEFAULT_TITLE = "Ruthram360° | Virtual Tours & Google Street View";
const DEFAULT_DESC =
  "Immersive 360° Virtual Tours, 3D Tours, and Google Street View for campuses, hospitals, hotels, and businesses.";

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  path = "/",
  image = "/og-image.jpg",
  noindex = false,
}: SeoProps) {
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
