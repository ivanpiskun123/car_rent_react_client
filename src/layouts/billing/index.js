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
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

import React, {useState, useEffect, useContext} from "react";

// Vision UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import CreditBalance from "./components/CreditBalance";
import {AuthContext} from "../../context/AuthContext";

import { useQuery,useMutation, gql } from '@apollo/client';

import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}



function Billing() {

  const {currentUserId} = useContext(AuthContext)
  const [paymentCard, setPaymentCard] = useState(null)
  const [payments, setPayments] = useState([])

  const GET_CARD_DATA = gql`
      query PaymentCard($userId: ID!) {
        paymentCard(userId: $userId)
        {
          code
          cvv
          dateExp
        }
      }
  `;

  const GET_PAYMENTS_DATA = gql`
      query Payments($userId: ID!) {
        payments(userId: $userId)
        {
        id
          isPaid
          amount
          rentedCarFullName
          createdAt
        }
      }
  `;



  const { loading: loadingCard, error: errorCard, data: dataCard } = useQuery(GET_CARD_DATA,{variables: {userId: currentUserId},fetchPolicy: 'network-only'});
  const { loading: loadingPayments, error: errorPayments, data: dataPayments } = useQuery(GET_PAYMENTS_DATA,{variables: {userId: currentUserId}, fetchPolicy: 'network-only'});


  useEffect(()=>{
        console.log(dataCard)
        if(dataCard !== undefined){
          setPaymentCard(dataCard.paymentCard)
        }
      },
      [dataCard])

  useEffect(()=>{
        console.log(dataPayments)
        if(dataPayments !== undefined){
          setPayments(dataPayments.payments)
        }
      },
      [dataPayments])

    const [cardOpen,setCardOpen] = useState(false)
    const [payOpen,setPayOpen] = useState(false)
    const [transition, setTransition] =useState(undefined);

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <Snackbar
            open={cardOpen}
            onClose={()=>setCardOpen(false)}
            TransitionComponent={transition}
            message="Карта обновлена"
            key={transition ? transition.name : ''}
        />
        <Snackbar
            open={payOpen}
            onClose={()=>setPayOpen(false)}
            TransitionComponent={transition}
            message="Платеж успешно завершен"
            key={transition ? transition.name : ''}
        />
      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={8}>
              <Grid container spacing={3}>
                {
                    dataCard === undefined && dataPayments === undefined ?
                    null
                    :
                     paymentCard === null ?
                    null
                    :
                        <>
                          <Grid item xs={12} xl={6}>
                            <MasterCard number={parseInt(paymentCard.code)} valid={paymentCard.dateExp}
                                        cvv={paymentCard.cvv}/>

                          </Grid>
                          <Grid item xs={12} md={12} xl={6}>
                            <CreditBalance payments={payments} />
                          </Grid>
                        </>
                }
                <Grid item xs={12}>
                  {
                    dataCard === undefined ?
                      null
                      :
                      <PaymentMethod  card={paymentCard } setPaymentCard={setPaymentCard} setCardOpen={setCardOpen}/>
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5} xl={4}>
              <Invoices />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox my={3}>

            {
                dataCard === undefined && dataPayments === undefined ?
                    null
                    :
                    paymentCard === null ?
                        <div style={{marginBottom: "200px"}}></div>
                        :
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={7}>
                                <BillingInformation payments={payments} setPayments={setPayments} setPayOpen={setPayOpen} />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Transactions payments={payments} />
                            </Grid>
                        </Grid>
            }




        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
