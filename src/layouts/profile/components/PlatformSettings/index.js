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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiSwitch from "components/VuiSwitch";

function PlatformSettings({user}) {

  return (
    <Card sx={{ minHeight: "490px", height: "100%" }}>
      <VuiBox mb="26px">
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          Верификация прав
        </VuiTypography>
      </VuiBox>
      <VuiBox lineHeight={1.25}>
        <VuiTypography
          variant="xxs"
          fontWeight="medium"
          mb="20px"
          color="text"
          textTransform="uppercase"
        >
          Почему это обязательно?
        </VuiTypography>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Верификация прав гарантирует пользование
              сервисом CarRent только тех водителей, кто имеет на это право
              в соответствии с Законодательсвом РБ
            </VuiTypography>
          </VuiBox>
        </VuiBox>


        <VuiBox mb="6px">
          <VuiTypography variant="xxs" fontWeight="medium" color="text" textTransform="uppercase">
            Как пройти верификацию?
          </VuiTypography>
        </VuiBox>
        <VuiBox display="flex" mb="14px">
          <VuiBox mt={0.25}>
            <VuiTypography variant="button" fontWeight="regular" color="text">
              Достаточно просто загрузить фотографию Ваших
              водительских прав без посторонних предметов. Затем
              администратор проведет верификацию, по результатам которой
              Вам или потребуется повторно загрузить фото лучшего качества,
              или Ваши права будут верифицированы и Вы сможете пользоваться сервисом.
              Желаем Вам Удачи!
            </VuiTypography>
          </VuiBox>
        </VuiBox>


      </VuiBox>
    </Card>
  );
}

export default PlatformSettings;
