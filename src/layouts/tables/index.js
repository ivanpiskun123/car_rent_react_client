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

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import car_ended from "../../assets/images/car_ended.jpeg"
import  car_in_rent from "../../assets/images/car_in_rent.jpeg"
import car_paid from "../../assets/images/car_paid.png"

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Grid from "@mui/material/Grid";
import {useContext, useEffect, useState} from "react";
import RentService from "../../API/RentService";
import {AuthContext} from "../../context/AuthContext";
import VuiInput from "../../components/VuiInput";


import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AlarmOn from '@mui/icons-material/AlarmOn';
import DriveEta from '@mui/icons-material/DriveEta';

import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import CarModal from "../modals/CarModal";
import {useRents} from "../../hooks/useRents";

import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

function Tables() {

  const {currentUserId} = useContext(AuthContext)

  const [isLoad, setIsLoad] = useState(true)

  const [rents, setRents] = useState([])
  const [sort, setSort] = useState("active")
  const [query, setQuery] = useState("")
  const searchedRents = useRents(rents, query,sort)
  const [carInfoOpen, setCarInfoOpen] = useState(false)
  const [carId, setCarId] = useState(null)


    const [open, setOpen] = useState(false);
    const [transition, setTransition] =useState(undefined);

    const handleClose = () => {
        setOpen(false);
    };

  useEffect(()=>{
      const fetchRents = async () => {
          try{
              const response = await RentService.getByUserId(currentUserId)
              setRents(response.data.data.data)
              console.log(response.data.data.data)
              setIsLoad(false)
          }
          catch(e){
              console.log(e)
              setIsLoad(false)
          }
      }
      fetchRents()
  },[])


    const handleEndRent = (rentId)=>{

        const endRent = async () => {
            try{
                const response = await RentService.endById(rentId)
                setRents(rents.map(  r =>
                {
                    if(r.id === rentId)
                    {
                        return response.data.data.data
                    }
                    return r
                }
                ))
                console.log(response.data)
                }
            catch(e){
                console.log(e)
            }
        }
        endRent()
        setTransition(() => TransitionRight);
        setOpen(true);
    }

  return (
      <>
    <DashboardLayout>
      <DashboardNavbar />
        <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            message="Прокат окончен. Платёж создан"
            key={transition ? transition.name : ''}
        />
            <VuiBox display="flex" flexDirection="column" height="100%">

                <Card  style={{marginBottom: "55px", marginTop: "30px"}}>

                <Grid container spacing={3}>
                    <Grid item xs={8} md={8}>
                <VuiBox display="flex" flexDirection="column" mb="24px">
                    <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                        Мои аренды
                    </VuiTypography>
                    <VuiTypography color="text" variant="button" fontWeight="regular">
                        Все Ваши аренды авто
                    </VuiTypography>
                </VuiBox>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <select name="pets" id="pet-select"
                        style={{backgroundColor: "#080841", color: "white",
                            borderRadius: "10px",
                            height: "35px",
                            width: "165px"}}
                                value={sort}
                                onChange={e => setSort(e.target.value) }
                        >
                            <option value="active" selected>Сначала активные</option>
                            <option value="ended">Сначала оконченные</option>
                            <option value="paid">Сначала оплаченные</option>
                            <option value="created">Сначала новые</option>
                        </select>
                    </Grid>
                        <Grid item xs={2} md={2}>
                <VuiBox pr={1}>
                    <VuiInput
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                        placeholder="Поиск..."
                        icon={{ component: "search", direction: "left" }}
                        sx={({ breakpoints }) => ({
                            [breakpoints.down("sm")]: {
                                maxWidth: "80px",
                            },
                            [breakpoints.only("sm")]: {
                                maxWidth: "80px",
                            },
                            backgroundColor: "info.main !important",
                        })}
                    />
                </VuiBox>
                    </Grid>
            </Grid>
                </Card>
                <Grid container spacing={3}>
        {
            isLoad ?
                <Box sx={{ display: 'flex', marginBottom: "56px"}}
                     style={{
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         height: '50vh',
                     }}
                >
                    <CircularProgress style={{marginLeft: "500px"}} />
                </Box>
                :
                searchedRents.length === 0 ?
                    <Box sx={{ display: 'flex', marginBottom: "56px"}}
                         style={{
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             height: '50vh',
                         }}
                    >
                        <div style={{marginLeft: "500px", color: "white"}} >
                            Аренд не найдено
                        </div>
                    </Box>
                    :
                <>
                    {
                        searchedRents.map((r)=>
                            <>
                                <Grid item xs={12} md={6} xl={4} >
                                    <Card sx={{ maxWidth: 345 }}>
                                        {
                                            r.attributes.ended_at ?
                                                null
                                                :
                                                <LinearProgress style={{backgroundColor: "#D61365"}} color="secondary"  />
                                        }
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="140"
                                            image={
                                                r.attributes.is_paid ?
                                                    car_paid
                                                    :
                                                    r.attributes.ended_at ?
                                                        car_ended
                                                        :
                                                        car_in_rent
                                            }
                                        />
                                        <CardContent >
                                            <Typography sx={{ fontSize: 13 }} style={
                                                r.attributes.is_paid ?
                                                    {color: "#528FFF"}
                                                    :
                                                    r.attributes.ended_at ?
                                                        {color: "#B13FC0"}
                                                        :
                                                        {color: "#D61365"}

                                            } gutterBottom>
                                                {
                                                r.attributes.is_paid ?
                                                    "Аренда оплачена в " + r.attributes.calc_amount + " у.е."
                                                    :
                                                    r.attributes.ended_at ?
                                                        "Прокат окончен - к оплате " + r.attributes.calc_amount+ " у.е."
                                                        :
                                                        "Активная аренда: счет " + r.attributes.calc_amount+ " у.е."
                                            }
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div" style={{color: "white", marginTop: "15px"}}>
                                                {r.relationships.car.meta.full_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={4} md={4} lg={4} style={{fontSize: "13px"}}>
                                                        Создана:
                                                    </Grid>
                                                    <Grid item xs={8} md={8} lg={8}>
                                                        {r.attributes.created_at}
                                                    </Grid>


                                                    <Grid item xs={4} md={4} lg={4} style={{fontSize: "13px"}}>
                                                        Окончен:
                                                    </Grid>
                                                    <Grid item xs={8} md={8} lg={8}>
                                                        {r.attributes.ended_at !== null ?
                                                            r.attributes.ended_at
                                                            :
                                                            "в прокате"
                                                        }
                                                    </Grid>

                                                </Grid>
                                            </Typography>
                                        </CardContent>
                                        <CardActions >
                                            <Tooltip title="Авто проката" placement="top">
                                            <IconButton onClick={()=>{setCarId(r.relationships.car.data.id);setCarInfoOpen(true)}} style={{backgroundColor: "#80ADFF"}} aria-label="add to shopping cart">
                                                <DriveEta />
                                            </IconButton>
                                            </Tooltip>

                                            {
                                                r.attributes.ended_at ?
                                                    null
                                                    :
                                                    <Tooltip title="Окончить прокат" placement="top">
                                                    <IconButton style={{backgroundColor: "#D61365"}} aria-label="add an alarm" onClick={()=>handleEndRent(r.id)}>
                                                        <AlarmOn />
                                                    </IconButton>
                                                    </Tooltip>
                                            }

                                        </CardActions>
                                    </Card>
                                </Grid>
                            </>
                        )
                    }

                </>
        }

                </Grid>
            </VuiBox>
            <CarModal carInfoOpen={carInfoOpen} setCarInfoOpen={setCarInfoOpen} carId={carId}/>


            <Footer/>
    </DashboardLayout>

      </>
  );
}

export default Tables;
