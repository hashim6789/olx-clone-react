// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { googleLogout } from "@react-oauth/google";
// import GoogleLoginButton from "../components/GoogleLoginButton";

const HomePage: React.FC = () => {
  const { auth, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (auth) {
      setProfile(auth);
    }
  }, [auth]);

  const handleLogout = () => {
    logout(); // Use the logout function from context
    setProfile(null); // Clear the profile state
  };

  return (
    <div>
      <h2>React Google Login</h2>

      <div>
        <img src={profile?.picture} alt="User Profile" />
        <h3>User Logged In</h3>
        <p>Name: {profile?.name}</p>
        <p>Email: {profile?.email}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default HomePage;
// // src/pages/HomePage.tsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../contexts/authContext";
// import { googleLogout } from "@react-oauth/google";
// import GoogleLoginButton from "../components/GoogleLoginButton";

// const HomePage: React.FC = () => {
//   const { auth, logout } = useAuth();
//   const [profile, setProfile] = useState<any>(null);

//   useEffect(() => {
//     if (auth) {
//       setProfile(auth);
//     }
//   }, [auth]);

//   const handleLogout = () => {
//     logout(); // Use the logout function from context
//     setProfile(null); // Clear the profile state
//   };

//   return (
//     <div>
//       <h2>React Google Login</h2>
//       {auth ? (
//         <div>
//           <img src={profile?.picture} alt="User Profile" />
//           <h3>User Logged In</h3>
//           <p>Name: {profile?.name}</p>
//           <p>Email: {profile?.email}</p>
//           <button onClick={handleLogout}>Log out</button>
//         </div>
//       ) : (
//         <GoogleLoginButton />
//       )}
//     </div>
//   );
// };

// export default HomePage;
