import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-darkVioletBg dark:bg-darkNeutralBg text-blackText dark:text-whiteText transition-[background-color] duration-500 font-sans">
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
