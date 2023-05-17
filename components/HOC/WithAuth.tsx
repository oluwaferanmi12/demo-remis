import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

interface Props {
  token: string;
}

const withAuth = <P extends object>(
  Component: NextPage<P>,
  { token }: Props
) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push("/login");
      } else {
        const decodedToken = jwtDecode(token) as { exp: number };
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          router.push("/login");
        }
      }
    }, [token]);

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
