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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiAvatar from "components/VuiAvatar";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import Card from "@mui/material/Card";
import { Grid } from '@mui/material';

function DefaultAdminProjectCard({ image, label, title,user,rejectDoc,approveDoc }) {


    return (
        <Card
          >
        <VuiBox
            sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
                overflow: "visible",
            }}
        >
            <VuiBox
                component="img"
                src={image}
                mb="8px"
                borderRadius="15px"
            />

            <VuiBox
                sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                        minHeight: "200px",
                    },
                })}
            >
                <VuiBox>
                    <Grid container>
                        <Grid item>
                            <VuiTypography variant="xxs" color="text" fontWeight="medium" textTransform="capitalize">
                                {label}
                            </VuiTypography>
                        </Grid>
                        <Grid item md={6}>
                    </Grid>
                        <Grid item>
                            <VuiBox display="flex">
                                <Tooltip title="Рассмотреть права" placement="top">
                                    <a href={user.relationships.document.meta.url} target="_blank">
                                        <IconButton color="primary"  aria-label="add to shopping cart">
                                            <Visibility />
                                        </IconButton>
                                    </a>
                                </Tooltip>
                            </VuiBox>
                        </Grid>
                    </Grid>


                </VuiBox>
                <VuiBox mb={1}>

                        <VuiTypography

                            rel="noreferrer"
                            color="white"
                            variant="h5"

                        >
                            {title}
                        </VuiTypography>

                </VuiBox>
                <VuiBox mb={3} lineHeight={0}>
                    <VuiTypography variant="button" fontWeight="regular" color="text">
                        {
                            (user.relationships.document.meta.url === null || user.relationships.document.meta.url === "") ?
                                "*ожидается загрузка нового фото документа"
                                :
                            user.relationships.document.meta.status === 1 ?
                                " *требуется верификация водительских прав пользователя"
                                :
                                user.relationships.document.meta.status === 2 ?
                                    "Верификация пройдена"
                                    :
                                    "*ожидается загрузка нового фото документа"
                        }

                    </VuiTypography>
                </VuiBox>

                    {
                        user.relationships.document.meta.status === 1 && (
                            user.relationships.document.meta.url !== null && user.relationships.document.meta.url !== ""
                        ) ?
                            <VuiBox display="flex" justifyContent="space-between" alignItems="center">
                                <VuiButton
                                    variant="outlined"
                                    size="small"
                                    color="white"
                                    aria-label="upload picture"
                                    component="label"
                                    onClick={()=>approveDoc(user.id)}
                                >
                                    Подтвердить
                                </VuiButton>
                                <VuiButton
                                    variant="outlined"
                                    size="small"
                                    color="white"
                                    aria-label="upload picture"
                                    component="label"
                                    onClick={()=>rejectDoc(user.id)}
                                >
                                    Отклонить
                                </VuiButton>
                            </VuiBox>
                            :
                            null
                    }

            </VuiBox>
        </VuiBox>
    </Card>
    );
}

// Setting default values for the props of DefaultProjectCard
DefaultAdminProjectCard.defaultProps = {
    authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultAdminProjectCard.propTypes = {
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    action: PropTypes.shape({
        type: PropTypes.oneOf(["external", "internal"]),
        route: PropTypes.string.isRequired,
        color: PropTypes.oneOf([
            "white",
            "text",
            "info",
            "success",
            "warning",
            "error",
            "light",
            "dark",
            "white",
        ]).isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultAdminProjectCard;
