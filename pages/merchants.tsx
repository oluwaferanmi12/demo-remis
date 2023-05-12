import { apiCall } from "@/apiClient/api";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { logoutUser } from "@/store/reducers/user";
import { useDispatch } from "react-redux";

function Merchant() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    apiCall("get", "Admin/GetRoles")
      .then((res) => {
        console.log(res?.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          dispatch(logoutUser());
          router.push("/admin/sign-in");
        }
        console.log(e);
      });
  }, []);
  return <div>Merchant</div>;
}

export default Merchant;
