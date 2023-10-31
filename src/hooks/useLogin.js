import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // Login
      const res = await projectAuth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          return userCredential;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast.error("Invalid Login Credentials")
          throw new Error(errorMessage);
        });

      // Update online status
      await projectFirestore
        .collection("users")
        .doc(res.user.uid)
        .update({ online: true });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
        const errorMessage = error.message || 'An unknown error occurred';
        
        // Extract the "INVALID_LOGIN_CREDENTIALS" message
        const invalidLoginMessage = errorMessage.match(/INVALID_LOGIN_CREDENTIALS/i);

        if (invalidLoginMessage) {
          toast.error(invalidLoginMessage[0]);
        } else {
          toast.error(errorMessage);
        }

        console.log(error); // Add a console log for debugging
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
