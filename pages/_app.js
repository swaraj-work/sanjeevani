import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <div className="overflow-x-hidden w-full">
        <Component {...pageProps} />
        </div>
    );
}
