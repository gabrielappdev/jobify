import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body style={{ overflowX: "hidden" }}>
          <div
            className="fake-scroll-element"
            style={{ position: "absolute", top: "-100000px" }}
          />
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
