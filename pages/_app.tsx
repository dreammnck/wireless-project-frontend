import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider from "../lib/UserContext";
import FloorProvider from "../lib/FloorContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FloorProvider>
      <UserProvider>
        <Component className="bg-white" {...pageProps} />;
      </UserProvider>
    </FloorProvider>
  );
}

export default MyApp;
