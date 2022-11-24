import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-darkVioletBg dark:bg-lightSlateBg text-blackText dark:text-whiteText transition-[background-color] duration-500">
          <div id="backdrop" />
          <div id="overlay" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
