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

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <VuiBox mb="28px" display="flex" justifyContent="space-between" alignItems="center">
        <VuiTypography variant="h6" fontWeight="bold" color="white">
            Политика конфиденциальности
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            <VuiTypography variant="h6"  color="white">
                {"  "}1.Администрация Сайта, не исполнившая свои обязательства, несёт ответственность за убытки,
                понесённые Пользователем в связи с неправомерным использованием персональных данных,
                в соответствии с законодательством Республики Беларусь. <p></p> <br/><hr/><br/>
                2. В случае утраты или разглашения Конфиденциальной информации Администрация Сайта несёт полную ответственность.
            </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default Invoices;
