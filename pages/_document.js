import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const meta = {
    title: "Manxeguin Dev",
    image: "https://assets.vercel.com/image/upload/q_auto/front/vercel/dps.png",
  };

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="u+KvGRKGKo1F4iIh3WqmoQ"
          async
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
