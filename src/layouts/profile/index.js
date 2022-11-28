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

// @mui material components
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import team1 from "assets/images/avatar1.png";
import team2 from "assets/images/avatar2.png";
import team3 from "assets/images/avatar3.png";
import team4 from "assets/images/avatar4.png";
// Images
import profile1 from "assets/images/profile-1.png";
import profile2 from "assets/images/profile-2.png";
import profile3 from "assets/images/profile-3.png";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Footer from "examples/Footer";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import Welcome from "../profile/components/Welcome/index";
import CarInformations from "./components/CarInformations";
import {useEffect, useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

import UserService from "../../API/UserService";


function Overview() {

    const {currentUserId} = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const [isLoad, setIsLoad] = useState(true)

    useEffect(()=>{

        const fetchUser = async () => {
            try{
                const response = await UserService.getById(currentUserId)
                setUser(response.data.data.data)
                console.log(response.data.data.data)
                setIsLoad(false)
            }
            catch(e){
                console.log(e)
                setIsLoad(false)
            }
        }
        fetchUser()

    },[])

  return (
    <DashboardLayout>
      <Header user={user} />
      <VuiBox mt={5} mb={3}>
        <Grid
          container
          spacing={3}
          sx={({ breakpoints }) => ({
            [breakpoints.only("xl")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          })}
        >
          <Grid
            item
            xs={12}
            xl={4}
            xxl={3}
            sx={({ breakpoints }) => ({
              minHeight: "400px",
              [breakpoints.only("xl")]: {
                gridArea: "1 / 1 / 2 / 2",
              },
            })}
          >
            <Welcome user={user}/>
          </Grid>
          <Grid
            item
            xs={12}
            xl={5}
            xxl={6}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "2 / 1 / 3 / 3",
              },
            })}
          >
            <CarInformations user={user} />
          </Grid>
          <Grid
            item
            xs={12}
            xl={3}
            xxl={3}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "1 / 2 / 2 / 3",
              },
            })}
          >
            <ProfileInfoCard
              title="Данные пользователя"
              description="
              Администрация Сайта, не исполнившая свои обязательства, несёт ответственность за убытки,
                понесённые Пользователем в связи с неправомерным использованием персональных данных,
                в соответствии с законодательством Республики Беларусь
              "
              info={{
                fullName: `${user === null ? "" :  `${user.attributes.first_name} ${user.attributes.second_name}`}`,
                mobile: `${user === null ? "" :  `${user.attributes.phone}`}`,
                email: `${user === null ? "" :  `${user.attributes.email}`}`,
                location: "Беларусь",
              }}

            />
          </Grid>
        </Grid>
      </VuiBox>
      <Grid container spacing={3} mb="30px">
        <Grid item xs={12} xl={6} height="100%">
          <PlatformSettings user={user}/>
        </Grid>
        <Grid item xs={12} xl={6}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox display="flex" flexDirection="column" mb="24px">
                <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                  Водительские права
                </VuiTypography>
                <VuiTypography color="text" variant="button" fontWeight="regular">
                  Ваши водительские права и статус верификации
                </VuiTypography>
              </VuiBox>
              <Grid container spacing={3}>

                <Grid item xs={12} md={12} xl={12}>
                  <DefaultProjectCard
                    image={ user === null || (user.relationships.document.meta.url === null || user.relationships.document.meta.url === "") ? profile1 : user.relationships.document.meta.url}
                    label="Загружено с Cloudinary"
                    title={
                      user === null ?
                        "Загрузка..."
                          :
                          user.relationships.document.meta.status === 2 ?
                              "Права верифицированы"
                              :
                              user.relationships.document.meta.status === 1 &&
                              (user.relationships.document.meta.url !== null && user.relationships.document.meta.url !== "") ?
                                  "В процессе верификации" :
                                  "Верификация не пройдена. Загрузите новое фото"
                    }
                    description="*к аренде допускаются водители с верифицироваными водительскими правами"
                    action={{
                      color: "white",
                      label: "НОВОЕ ФОТО",
                    }}

                    user = {user}
                    setUser = {setUser}
                  />
                </Grid>

              </Grid>
            </VuiBox>
          </Card>
        </Grid>
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
