import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Token } from "../types";

// const checkAuth = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(["token"]);
//   useEffect(() => {
//     if (cookies.token) {
//       console.log("token exists");
//     } else {
//       console.log("token does not exist");
//     }
//   }, [cookies.token]);
  
//   if (cookies.token && cookies.token !== '') {
//     return true;
//   }
//   return false;
// };

// const reducer = (state: any, action: any) => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         token: action.token,
//         expires: action.expires,
//         isAuthenticated: true,
//       };
//     case "LOGOUT":
//       return {
//         token: null,
//         expires: null,
//         isAuthenticated: false,
//       };
//     default:
//       return state;
//   }
// };


// // create auth hook
// const useAuth = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  
//   const [auth, dispatch] = useReducer(reducer, {
//     token: cookies.token,
//     isAuthenticated: false,
//   });

//   const login = (token: string, expires: string) => {
//     setCookie("token", token, { path: "/", expires: new Date(expires) });
//     dispatch({ type: "LOGIN", token: token, expires: expires });
//   };

//   const logout = () => {
//     removeCookie("token", { path: "/" });
//     dispatch({ type: "LOGOUT" });
//   };

//   return [ auth, login, logout ];
// };

// export { checkAuth, useAuth };

const authContext = createContext({});

export function ProvideAuth({ children } : any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const loginQuery = (email: string, password: string) => {
  return useQuery(
    ['login'],
    async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
    {
      onSuccess: (data: Token) => {
        return data;
      },
      onError: (error) => {
        console.error(error);
      },
      refetchOnWindowFocus: false,
    }
  );
}

function useProvideAuth() {
  const [user, setUser] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = (email: string, password: string) => {
    const { data, error, isLoading } = loginQuery(email, password);
    if (data) {
      setUser(data);
      setCookie("token", data.token, { path: "/", expires: new Date(data.expiresAt) });
    }
    if (error) {
      console.error(error);
    }
    if (isLoading) {
      console.log('loading');
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = () => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    };

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    login,
  };
}