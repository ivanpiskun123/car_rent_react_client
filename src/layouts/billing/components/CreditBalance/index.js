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

import React from "react";

// @mui components
import { Card, Stack } from "@mui/material";

// Vision UI Dashboard assets
import balance from "assets/images/billing-background-balance.png";
import Graph from "assets/images/shapes/graph-billing.svg";

import palette from "assets/theme/base/colors";

// Vision UI Dashboard components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// React icons
import { FaEllipsisH } from "react-icons/fa";
import { MdOutlineDomain } from "react-icons/md";

const CreditBalance = ({payments}) => {

  const calculateSum =  (payments)=>{
    return payments.filter((p)=>p.isPaid).reduce((sum,p)=>{
      return sum+p.amount
    },0)
  }

  return (
    <Card sx={{ padding: "30px" }}>
      <VuiBox display="flex" flexDirection="column">
        <VuiBox
          mb="32px"
          p="20px"
          display="flex"
          flexDirection="column"
          sx={{ backgroundImage: `url(${balance})`, backgroundSize: "cover", borderRadius: "18px" }}
        >
          <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
            <VuiTypography variant="caption" color="white" fontWeight="medium" mr="auto">
              БАЛАНС ЗАКРЫТЫХ ПЛАТЕЖЕЙ
            </VuiTypography>
            <FaEllipsisH color="white" size="18px" sx={{ cursor: "pointer" }} />
          </VuiBox>
          <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
            <VuiTypography variant="h3" color="white" fontWeight="bold" mr="auto">
              {
                payments.filter((p)=>p.isPaid).length === 0 ?
                    "0 y.e."
                    :
                    `${calculateSum(payments)} y.e.`
              }
            </VuiTypography>
            <VuiBox component="img" src={Graph} sx={{ width: "58px", height: "20px" }} />
          </VuiBox>
        </VuiBox>
        <VuiTypography color="text" variant="xxs" fontWeight="medium" mb="8px">
          ПОСЛЕДНИЙ
        </VuiTypography>

        {
          payments.length !== 0 ?
              <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
                <Stack direction="row" spacing="10px" mr="auto">
                  <VuiBox
                      display="flex"
                      mr="10px"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        background: "rgba(34, 41, 78, 0.7)",
                        borderRadius: "50%",
                        width: "42px",
                        height: "42px",
                      }}
                  >
                    <MdOutlineDomain color={palette.success.main} size="20px" />
                  </VuiBox>
                  <VuiBox display="flex" flexDirection="column">
                    <VuiTypography color="white" variant="button" fontWeight="medium">
                      {payments[0].rentedCarFullName}
                      {

                          payments[0].isPaid ?
                              "   (оплачен)"
                              :
                              "   (неоплачен)"

                      }
                    </VuiTypography>
                    <VuiTypography color="text" variant="button" fontWeight="medium">
                      {payments[0].createdAt}
                    </VuiTypography>
                  </VuiBox>
                </Stack>
                <VuiTypography variant="button" color="white" fontWeight="bold">
                  - {payments[0].amount} y.e.
                </VuiTypography>
              </VuiBox>
              :
              "Нет платежей"
        }




      </VuiBox>
    </Card>
  );
};

export default CreditBalance;
