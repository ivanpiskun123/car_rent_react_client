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

import { useQuery,useMutation, gql } from '@apollo/client';
import {useContext} from "react";
import {AuthContext} from "../../../../context/AuthContext";

function DefaultProjectCard({ image, label, title, description, action,user, setUser }) {


    const CHANGE_USER_IMAGE = gql`
      mutation($imageUrl: String!, $userId: Int!) {
        changeOrCreateUserDoc(imageUrl: $imageUrl, userId: $userId){
          document{
            status 
          }
        }
      }
  `;

    const [changeImage, { dataImage, loadingImage, errorImage }] = useMutation(CHANGE_USER_IMAGE);


    const upload = (e)=>{
        const dataRaw = new FormData()
        dataRaw.append("file", e.target.files[0])
        dataRaw.append("upload_preset", "zzpmbswm")
        dataRaw.append("cloud_name","drntpsmxs")
        fetch("https://api.cloudinary.com/v1_1/drntpsmxs/image/upload",{
            method:"post",
            body: dataRaw
        })
            .then(resp => resp.json())
            .then(imageData => {
                changeImage({variables: {imageUrl: imageData.url, userId: parseInt(user.id)}})
                if(errorImage)
                {console.log("Error while changing image: ", errorImage)}
                else{
                    setUser(prevUser => (
                        {...prevUser,
                            relationships: {...prevUser.relationships,
                                document: {...prevUser.relationships.document,
                                    meta: {status: 1, url: imageData.url}
                                } }}
                    )
                    )
                }
            })
            .catch(err => console.log(err))
    }

  return (
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
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: {
            height: "400px",
              width: "500px"
          },
        })}
      />

      <VuiBox
        sx={({ breakpoints }) => ({
          [breakpoints.only("xl")]: {
            minHeight: "200px",
          },
        })}
      >
        <VuiBox>
          <VuiTypography variant="xxs" color="text" fontWeight="medium" textTransform="capitalize">
            {label}
          </VuiTypography>
        </VuiBox>
        <VuiBox mb={1}>
          {action.type === "internal" ? (
            <VuiTypography

              variant="h5"
              color="white"
            >
              {title}
            </VuiTypography>
          ) : (
            <VuiTypography

              rel="noreferrer"
              color="white"
              variant="h5"

            >
              {title}
            </VuiTypography>
          )}
        </VuiBox>
        <VuiBox mb={3} lineHeight={0}>
          <VuiTypography variant="button" fontWeight="regular" color="text">
            {description}
          </VuiTypography>
        </VuiBox>
        <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiButton
              variant="outlined"
              size="small"
              color={action.color}
              aria-label="upload picture"
              component="label"
            >
                <input hidden accept="image/*" type="file" name="images" onChange={upload}  />
              {action.label}
            </VuiButton>
          <VuiBox display="flex">
              <Tooltip title="Рассмотреть права" placement="top">
                  {
                      user === null ?
                          <a href="#" target="_blank">
                              <IconButton   aria-label="add to shopping cart">
                                  <Visibility />
                              </IconButton>
                          </a>
                          :
                          <a href={user.relationships.document.meta.url} target="_blank">
                              <IconButton color="primary"  aria-label="add to shopping cart">
                                  <Visibility />
                              </IconButton>
                          </a>
                  }
              </Tooltip>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
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

export default DefaultProjectCard;
