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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Vision UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import colors from "assets/theme/base/colors";

// Vision UI Dashboard component exemples
import Mastercard from "examples/Icons/Mastercard";
import Visa from "examples/Icons/Visa";
import {useState,useContext} from "react";

import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import billingCard from "../../../../assets/images/billing-background-card.png";

import { RiMastercardFill } from "react-icons/ri";
import VuiInput from "../../../../components/VuiInput";
import { useQuery,useMutation, gql } from '@apollo/client';
import {AuthContext} from "../../../../context/AuthContext";

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  backgroundColor: "white"
};



function PaymentMethod({card, setPaymentCard, setCardOpen, }) {
  const { grey } = colors;

    const {currentUserId} = useContext(AuthContext)

  const [open,setOpen] = useState(false)
  const [transition, setTransition] =useState(undefined);

  const [code, setCode] = useState("")
  const [cvv, setCvv] = useState("")
  const [expDate, setExpDate] = useState("")


    const CHANGE_OR_CREATE_CARD = gql`
      mutation($userId: Int!, $code: String!, $cvv: String!, $dateExp: String!) {
        changeOrCreatePaymentCard(userId: $userId, code: $code, cvv: $cvv, dateExp: $dateExp){
        paymentCard{
            code
              cvv
              dateExp
        }
        }
      }
  `;

    const [changeOrCreatePaymentCard, {data, loading, error}] = useMutation(CHANGE_OR_CREATE_CARD)


    const handleNewCard = async ()=>{

        try {
        const dataCard = await changeOrCreatePaymentCard({
            variables: {
                userId: parseInt(currentUserId),
                code: code,
                cvv: cvv,
                dateExp: expDate
            }
        })
           console.log(data)
        setPaymentCard({ code: code,
            cvv: cvv,
            dateExp: expDate})
            setCardOpen(true)
            setOpen(false)
        }
        catch (e){
                console.log(e)
            }


    }




  return (
    <Card id="delete-account">
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiTypography variant="lg" fontWeight="bold" color="white">
          Ваша платежная карта
        </VuiTypography>
        <VuiButton variant="contained" color="info"
        onClick={()=>setOpen(true)}
        >
          {
            card === null || card === undefined ?
                "ДОБАВИТЬ КАРТУ"
                :
                "ИЗМЕНИТЬ КАРТУ"
          }
        </VuiButton>
      </VuiBox>
      <VuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
          </Grid>
          <Grid item xs={12} md={6}>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              <Mastercard width="21px" />
              <VuiTypography pl={2} variant="button" color="white" fontWeight="medium">
                {
                  card === null || card === undefined ?
                      "XXXX XXXX XXXX XXXX"
                      :
                      card.code
                }

              </VuiTypography>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={3}>
          </Grid>

        </Grid>
      </VuiBox>

      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={()=>setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={open}>
          <Box sx={style}>


            <Card sx={{ background: `url('${billingCard}')`, backdropfilter: "blur(31px)", minWidth: 400,minHeight: 270}}  >
              <VuiBox p={2} pt={0}>
                <VuiBox
                    color="white"
                    lineHeight={0}
                    display="flex"
                    justifyContent="space-beetween"
                    alignItems="center"
                    width="100%"
                    sx={{ width: "100%" }}
                >
                  <VuiTypography color="white" variant="lg" fontWeight="bold" mr="auto">
                    Новая карта
                  </VuiTypography>
                  <RiMastercardFill size="48px" color="white" />
                </VuiBox>
                <VuiInput
                    value={code}
                    onChange={(e)=>setCode(e.target.value)}
                    placeholder="Номер"
                    variant="h4"
                    mt={8}
                    style={{marginTop: "15px", marginBottom: "15px"}}
                    fontWeight="medium"
                    sx={({ breakpoints }) => ({
                      [breakpoints.down("sm")]: {
                        mt: 8,
                        pb: 1,
                        maxWidth: "80px",
                        fontSize: "22px",
                      },
                      [breakpoints.only("sm")]: {
                        mt: 8,
                        pb: 1,
                        maxWidth: "80px",
                        fontSize: "22px",
                      },
                      backgroundColor: "info.main !important",
                    })}
                />
                <VuiBox display="flex" justifyContent="space-between" alignItems="center">
                  <VuiBox display="flex" alignItems="center">
                    <VuiBox mr={3} lineHeight={1}>
                      <VuiTypography variant="xxs" color="white" fontWeight="medium" opacity={0.8}>
                        СРОК ДЕЙСТВИЯ
                      </VuiTypography>
                      <VuiInput
                          value={expDate}
                          onChange={(e)=>setExpDate(e.target.value)}
                          fontWeight="medium"
                          placeholder="mm/yy"
                          style={{width: "20px"}}
                          sx={({ breakpoints }) => ({
                            [breakpoints.down("sm")]: {
                              mt: 8,
                              maxWidth: "40px",
                              fontSize: "22px",
                            },
                            [breakpoints.only("sm")]: {
                              mt: 8,
                              maxWidth: "40px",
                              fontSize: "22px",
                            },
                            backgroundColor: "info.main !important",
                          })}
                      />
                    </VuiBox>
                    <VuiBox lineHeight={1}>
                      <VuiTypography variant="xxs" color="white" fontWeight="medium" opacity={0.8}>
                        CVV
                      </VuiTypography>
                      <VuiInput
                          value={cvv}
                          onChange={(e)=>setCvv(e.target.value)}
                          fontWeight="medium"
                          placeholder="XXX"
                          style={{width: "20px"}}
                          sx={({ breakpoints }) => ({
                            [breakpoints.down("sm")]: {
                              mt: 8,
                              maxWidth: "40px",
                              fontSize: "22px",
                            },
                            [breakpoints.only("sm")]: {
                              mt: 8,
                              maxWidth: "40px",
                              fontSize: "22px",
                            },
                            backgroundColor: "info.main !important",
                          })}
                      />
                    </VuiBox>
                  </VuiBox>
                </VuiBox>

                <VuiButton variant="contained" color="info"
                           onClick={()=>handleNewCard()} style={{marginTop: "15px",marginBottom: "50px",position: 'absolute', right: 39}}
                >
                  ГОТОВО
                </VuiButton>

              </VuiBox>
            </Card>
          </Box>
        </Fade>
      </Modal>

    </Card>
  );
}

export default PaymentMethod;
