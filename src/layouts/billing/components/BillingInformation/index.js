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

// Billing page components
import Bill from "layouts/billing/components/Bill";


import { useQuery,useMutation, gql } from '@apollo/client';
import {useContext} from "react";

function BillingInformation({payments, setPayments, setPayOpen}) {

    const PAY_FOR_PAYMENT = gql`
      mutation($paymentId: Int!) {
        payForPayment(paymentId: $paymentId){
        payment{
              amount
              isPaid
          }
        }
      }
  `;

    const [payPayment, {dataPay, loadingPay, errorPay}] = useMutation(PAY_FOR_PAYMENT)

    const handlePay = async (id) =>{

        try {
            const dataPayment = await payPayment({
                variables: {
                    paymentId: parseInt(id),
                }
            })
            setPayments(
                payments.map((p)=>{
                    if(p.id === id)
                    {
                        return {...p, isPaid: true}
                    }
                    return p
                })
            )
            setPayOpen(true)
        }
        catch (e){
            console.log(e)
        }



    }

  return (
    <Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Открытые платежи
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {
                payments.filter((p)=>!p.isPaid).length === 0 ?
                    "Открытых платежей нет"
                    :
                payments.filter((p)=>!p.isPaid).map((p)=>
                    <Bill
                        name={p.rentedCarFullName}
                        company={p.createdAt}
                        email={p.amount}
                        handlePay={()=>handlePay(p.id)}
                        noGutter
                    />
                )
            }

        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default BillingInformation;
