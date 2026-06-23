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
}) {
  const url = `${SITE}${path}`;
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
};
