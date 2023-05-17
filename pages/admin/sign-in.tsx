import { FormInput } from "@/components/Inputs/FormInput";
import { FormSubmitButton } from "@/components/Inputs/FormSubmitButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiCall } from "@/apiClient/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { saveUser } from "@/store/reducers/user";
import { useRouter } from "next/router";
import { Row, Col } from "antd";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import logo from "../../public/IMAGES/Group 2849/Group 2849.png";
import emailValidate from "@/utils/ValidateEmail";
import { saveUserDetails } from "@/utils/saveUserDetails";
import { GetUserDetails } from "@/utils/GetUserDetails";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [passwordValue, setPasswordValue] = useState("");
  const [email, setEmail] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [error, setError] = useState("");

  interface jwtDecodeProp {
    exp: number;
  }

  const validateFunction = ({
    email,
    passwordValue,
  }: {
    email: string;
    passwordValue: string;
  }) => {
    let error = false;
    if (passwordValue && email && emailValidate(email)) {
      setDisableButton(false);
      error = false;
    } else {
      setDisableButton(true);
      error = true;
    }
    return error;
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (validateFunction({ email, passwordValue })) {
      return;
    }
    setDisableButton(true);

    apiCall("post", "login", data)
      .then((res) => {
        saveUserDetails(res?.data);
        dispatch(saveUser(res?.data));
        router.push("/users");
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          setError("Invalid login credential");
        } else {
          setError("Oops!,An unexpected error occured, Please try again");
        }
      })
      .finally(() => {
        setDisableButton(false);
      });
  };

  useEffect(() => {
    // userPayload.isLoggedIn && router.push("/");
    const dateValue = Math.floor(Date.now() / 1000);
    if (document.cookie && document.cookie.includes("=")) {
      const cookie_value: string[] = document.cookie.split("=");
      if (cookie_value.length >= 2) {
        let decodeJwt: jwtDecodeProp = { exp: 0 };
        try {
          decodeJwt = jwt_decode(cookie_value[1]);
        } catch (error) {
          // console.log(error);
        }
        if (dateValue >= decodeJwt.exp) {
          localStorage.clear();
          Cookies.remove("token");
        } else {
          router.push("/users");
        }
      }
    }

    // check if user is logged in
    // console.log(document.cookie.split)
    // if(document.cookie && document.cookie.split("=")[])

    // GetUserDetails() && router.push("/");

    if (passwordValue && email && emailValidate(email)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
    // validateFunction({ email, passwordValue });
  }, [passwordValue, email]);
  return (
    <div className={styles.signInBackground}>
      <Row justify="center" align="middle">
        <Col xs={22} lg={10} xl={8} sm={16}>
          <div className="flex justify-center mb-8">
            <Image src={logo} alt="" />
          </div>
          <div className="bg-white rounded-xl py-6 px-16 ">
            <div className="text-center font-Quiet_sans text-2xl font-semibold tracking-wide">
              <p className="mb-10">Login to your dashboard</p>
            </div>
            <form action="" onSubmit={handleSignIn}>
              <div className="mb-5">
                <FormInput
                  label="Email Address"
                  name="email"
                  placeholder="email@email.com"
                  handleInputData={setEmail}
                />
              </div>

              <div>
                <FormInput
                  label="Password"
                  passwordType={true}
                  name="password"
                  handleInputData={setPasswordValue}
                />
              </div>
              {/* <div className="flex justify-between font-Quiet_sans tracking-wide my-4">
                <div className="flex items-center accent-[#001755]">
                  <div className="flex">
                    <input type="checkbox" className="w-[20px]" />
                  </div>
                  <p>Keep me logged in</p>
                </div>

                <div>
                  <p className="underline cursor-pointer">Forgot password</p>
                </div>
              </div> */}

              <div>
                <FormSubmitButton
                  label={"Sign in"}
                  buttonDisabled={disableButton}
                />
              </div>
            </form>
            <div className="mt-2 text-center">
              <p className="font-Quiet_sans text-[red]">{error}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SignIn;
