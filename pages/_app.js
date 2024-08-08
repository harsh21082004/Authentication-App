import "@/styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (router.pathname === "/login" || router.pathname === "/signup" || router.pathname === "/verify") {
        router.push("/");
      }
      let token = localStorage.getItem("token");
      let decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } else {
      if (router.pathname === "/" || router.pathname === "/create") {
        router.push("/login");
      }
    }

    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })

    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
  }, [router]);
  return (
    <>
      <LoadingBar
        color='#df00a2'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={600} className='loading-bar'
      />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>);
}
