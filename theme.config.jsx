export default {
  footer: <p></p>,
  head: ({ title, meta }) => (
    <>
      <meta name="description" content={meta.description} />
      <meta property="og:site_name" content="Manxeguin Dev" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={title} />
      <meta name="twitter:site" content="Manxeguin Dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={meta.description} />

      {meta.tag && <meta name="keywords" content={meta.tag} />}
    </>
  ),
  readMore: "Read More →",
  postFooter: null,
  darkMode: false,
  navs: [],
};
