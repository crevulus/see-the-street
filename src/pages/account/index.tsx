import { firebaseApp } from "@/firebase";
import { getAuth } from "firebase/auth";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const auth = getAuth(firebaseApp);

const Auth = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <div>
      <button className="btn btn-primary" onClick={() => signInWithGoogle()}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
