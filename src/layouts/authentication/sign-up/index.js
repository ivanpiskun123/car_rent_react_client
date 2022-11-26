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

import {useContext, useState} from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signUpImage.png";
import {AuthContext} from "../../../context/AuthContext";
import AuthService from "../../../API/AuthService";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [phone,setPhone] = useState("")


  const {setCurrentUserId, setIsAuth, setIsAdmin} = useContext(AuthContext)

  const register = () =>{
    const authRegisterUser = async () => {
      try {
        let user = {
         first_name: firstName,
         second_name: secondName,
         phone: phone,
         email: email,
         password: password
        }
        const response = await AuthService.register(user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('user_id',response.data.user_id)
        localStorage.setItem('is_admin',response.data.is_admin)
        setIsAdmin(response.data.is_admin)
        setCurrentUserId(response.data.user_id)
        localStorage.setItem('auth', 'true')
        setIsAuth(true)
      } catch (e) {
        console.log(e)
      }
    }
    authRegisterUser()
  }

  return (
    <CoverLayout
      title="Приветствуем!"
      color="white"
      description="Для того чтобы воспользоваться услугами сервиса CarRent - зарегистрируйтесь"
      image={bgSignIn}
      premotto="Многофункциональный сервис"
      motto="Аренды и проката авто"
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
        >

          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Имя
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
                placeholder="Ваше имя..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
              />
            </GradientBorder>
          </VuiBox>

          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Фамилия
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
                  placeholder="Ваша фамилия..."
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  value={secondName}
                  onChange={(e)=>setSecondName(e.target.value)}
              />
            </GradientBorder>
          </VuiBox>

          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Моб. номер
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
                  placeholder="Ваша номер телефона..."
                  sx={({ typography: { size } }) => ({
                    fontSize: size.sm,
                  })}
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
              />
            </GradientBorder>
          </VuiBox>

          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Email
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
                type="email"
                placeholder="Ваш email..."
                sx={({ typography: { size } }) => ({
                  fontSize: size.sm,
                })}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
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
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth onClick={()=>register()}>
              Зарегистрироваться
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              У Вас уже есть аккаунт?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Войти
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignIn;
