import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en" className="overflow-x-hidden">
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <body className="antialiased overflow-x-hidden w-full">
        <Main />
        <NextScript />
        </body>
        </Html>
    );
}
