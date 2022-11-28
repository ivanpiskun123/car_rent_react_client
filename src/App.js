import { useState, useEffect, useMemo } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Vision UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Vision UI Dashboard React routes
import routes from "routes";

// Vision UI Dashboard React contexts
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import {AuthContext} from "./context/AuthContext";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const [isAuth, setIsAuth] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect( ()=> {
        setIsAuth(false)
        if(localStorage.getItem('auth'))
        {
          setCurrentUserId(localStorage.getItem('user_id'))
          setIsAuth(true)
          localStorage.getItem('is_admin') === 'true' ?
              setIsAdmin(true)
              :
              setIsAdmin(false)
        }
      }
      ,[])

  const logOut = ()=>{
    const logOutUser = async () => {
      try {
        localStorage.removeItem('token')
        localStorage.removeItem('auth')
          handleConfiguratorOpen()
        setIsAuth(false)
      } catch (e) {
        console.log(e)
      }

    }
    logOutUser()
  }



  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes, isPublic, isAdminLogged) =>
      allRoutes.filter((r)=>{
        if(isPublic)
        {
          return r.public
        }
        else
        {
          return !r.public
        }
      }).filter((r)=>{
    if(isAdminLogged){
      return (
          r.route !== "/rents"
          &&
          r.route !== "/profile"
          &&
          r.route !== "/payments"

      )
    }
    else
    {
      return (
          r.route !== "/users"
      )
    }
  }).map((route) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return <Route exact path={route.route} component={route.component} key={route.key} />;
        }

        return null;
      })

  const configsButton = (
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="info"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </VuiBox>
  );

  return (
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{
          isAuth,
          setIsAuth,
          currentUserId,
          setCurrentUserId,
          logOut,
          isAdmin,
          setIsAdmin
        }}>
        <CssBaseline />
        {layout === "dashboard" && (
            <>
              <Sidenav
                  color={sidenavColor}
                  href="/dashboard"
                  brandName="CAR RENT"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
        )}
        {layout === "vr" && <Configurator />}
        <Switch>
          {
            isAuth ?
                isAdmin ?
                    <>
                      {getRoutes(routes, false, true)}
                      <Redirect from="*" to="/cars" />
                    </>
                    :
                <>
                  {getRoutes(routes, false,false)}
                  <Redirect from="*" to="/cars" />
                </>
                :
                <>
                  {getRoutes(routes, true, false)}
                  <Redirect from="*" to="/authentication/sign-in" />
                </>
          }
        </Switch>
        </AuthContext.Provider>
      </ThemeProvider>
  );
}
