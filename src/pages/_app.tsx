import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import "styles/globals.css"
import { Toaster } from "react-hot-toast"

const MarketplaceContextProvider = dynamic(
  () => import("context/MarketplaceContextProvider"),
  { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MarketplaceContextProvider>
      <div>
        <Toaster position="top-center" />
      </div>

      <Component {...pageProps} />
    </MarketplaceContextProvider>
  )
}

export default MyApp
