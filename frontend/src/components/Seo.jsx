import PropTypes from "prop-types";

/*
 * Per-page SEO tags using React 19's native document-metadata support.
 * React hoists <title>/<meta>/<link> rendered here into <head>, and
 * react-snap captures them at build time so each pre-rendered page gets
 * its own unique title, description, canonical, and social tags.
 *
 * The page-varying tags were removed from index.html so they don't
 * duplicate — index.html only keeps the static defaults + JSON-LD.
 */
const SITE = "https://thesocial99.com";
const DEFAULT_IMAGE = `${SITE}/Logo@2x.png`;

export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  breadcrumbs = null,
  article = null,
}) {
  const url = `${SITE}${path}`;

  // BreadcrumbList JSON-LD — shows the nav trail (Home › Blog › …) in results.
  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            item: `${SITE}${b.path}`,
          })),
        }
      : null;

  // Article JSON-LD — marks blog posts as articles (headline, date, author).
  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.headline || title,
        description,
        image: article.image || image,
        url,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: { "@type": "Organization", name: "The Social 99", url: `${SITE}/` },
        publisher: {
          "@type": "Organization",
          name: "The Social 99",
          logo: { "@type": "ImageObject", url: DEFAULT_IMAGE },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }
    : null;

  return (
    <>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data (JSON-LD) */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </>
  );
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  noindex: PropTypes.bool,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, path: PropTypes.string })
  ),
  article: PropTypes.shape({
    headline: PropTypes.string,
    image: PropTypes.string,
    datePublished: PropTypes.string,
    dateModified: PropTypes.string,
  }),
};
