/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {useContext, useEffect, useState} from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";
import AuthService from "../../../API/AuthService";
import {AuthContext} from "../../../context/AuthContext";
import '../../../assets/styles/login.css'

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setCurrentUserId, setIsAuth, setIsAdmin} = useContext(AuthContext)

  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const [formStyleClasses, setFormStyleClasses] = useState("")

  useEffect(
      ()=>{
        if(isLoginFailed )
        {
          setFormStyleClasses("shaking-class" );
          setTimeout(() => {setFormStyleClasses("" );}, 800);
          setIsLoginFailed(false)
        }
      },
      [isLoginFailed]
  )

  const login = () => {
    const authFetchUser = async () => {
      try {
        const response = await AuthService.athenticate(email, password);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('user_id',response.data.user_id)
        localStorage.setItem('is_admin',response.data.is_admin)
        setIsAdmin(response.data.is_admin)
        setCurrentUserId(response.data.user_id)
        localStorage.setItem('auth', 'true')
        setIsAuth(true)
      } catch (e) {
        setIsLoginFailed(true)
      }
    }
    authFetchUser()
  }

  return (
    <CoverLayout
      title="Вы снова с нами"
      color="white"
      description="Введите Ваш email и пароль для входа"
      premotto="Многофункциональный сервис"
      motto="Аренды и проката авто"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form">
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Ваш email..." fontWeight="500" />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Пароль
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Ваш пароль..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Запомнить меня
          </VuiTypography>
        </VuiBox>
        <VuiBox mt={4} mb={1} className={formStyleClasses} >
          <VuiButton color="info" fullWidth onClick={()=>login()}>
            Войти
          </VuiButton>
        </VuiBox>
        <VuiBox mt={3} textAlign="center">
          {/*<VuiTypography variant="button" color="text" fontWeight="regular">*/}
          {/*  У Вас нет аккаунта?{" "}*/}
          {/*  <VuiTypography*/}
          {/*    component={Link}*/}
          {/*    to="/authentication/sign-up"*/}
          {/*    variant="button"*/}
          {/*    color="white"*/}
          {/*    fontWeight="medium"*/}
          {/*  >*/}
          {/*   Зарегистрируйтесь*/}
          {/*  </VuiTypography>*/}
          {/*</VuiTypography>*/}
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
