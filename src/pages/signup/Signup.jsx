import React, { useState } from "react";
import "./Signup.css";
import { useSignup } from "../../hooks/useSignup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    signup(email, password, displayName, thumbnail);
    toast.success("Signup successful, Your Dashboard is Loading 😎"); // Show a success toast, but don't navigate to login

  };

  const imgHandler = (e) => {
    setThumbnail(null);

    let selected = e.target.files[0]; // this is the file that we have selected

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (selected.size > 500000) {
      setThumbnailError("Image size should be less than 500kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </label>{" "}
      <label>
        <span>Name:</span>
        <input
          type="text"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your name"
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </label>
      <label>
        <span>Profile Picture:</span>
        <input type="file" required onChange={imgHandler} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          loading...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
