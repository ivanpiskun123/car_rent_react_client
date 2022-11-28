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
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import Bill from "../Bill";

function Transactions({payments}) {
  return (
    <Card sx={{ height: "100%" }}>
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="18px"
        sx={({ breakpoints }) => ({
          [breakpoints.down("lg")]: {
            flexDirection: "column",
          },
        })}
      >
        <VuiTypography
          variant="lg"
          fontWeight="bold"
          textTransform="capitalize"
          color="white"
          sx={({ breakpoints }) => ({
            [breakpoints.only("sm")]: {
              mb: "6px",
            },
          })}
        >
          Все платежи
        </VuiTypography>

      </VuiBox>
      <VuiBox>
        <VuiBox mb={2}>
          <VuiTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="uppercase"
          >
            Открытые платежи
          </VuiTypography>
        </VuiBox>

        <VuiBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
        >
        {
          payments.filter((p)=>!p.isPaid).length === 0 ?
              "Открытых платежей нет"
              :
              payments.filter((p)=>!p.isPaid).map((p)=>
                  <Transaction
                      color="error"
                      icon="arrow_downward"
                      name={p.rentedCarFullName}
                      description={p.createdAt}
                      value={""+p.amount + " y.e." }
                  />
              )
        }
        </VuiBox>


        <VuiBox mt={1} mb={2}>
          <VuiTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="uppercase"
          >
            Закрытые платежи
          </VuiTypography>
        </VuiBox>

        <VuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >

          {
            payments.filter((p)=>p.isPaid).length === 0 ?
                "Закрытых платежей нет"
                :
                payments.filter((p)=>p.isPaid).map((p)=>
                    <Transaction
                        color="success"
                        icon="arrow_upward"
                        name={p.rentedCarFullName}
                        description={p.createdAt}
                        value={""+p.amount + " y.e." }
                    />
                )
          }


        </VuiBox>

      </VuiBox>
    </Card>
  );
}

export default Transactions;
