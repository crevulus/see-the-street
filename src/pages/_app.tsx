import "@/styles/globals.css"; // need to keep this in for daisyui to work
import type { AppProps } from "next/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { firebaseApp } from "../firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(firebaseApp);

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, (userData) => {});
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component {...pageProps} />;
}
