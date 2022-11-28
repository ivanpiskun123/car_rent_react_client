import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import DefaultProjectCard from "../../examples/Cards/ProjectCards/DefaultProjectCard";


import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Grid from "@mui/material/Grid";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import VuiInput from "../../components/VuiInput";

import CarService from "../../API/CarService";

import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CarRental from '@mui/icons-material/CarRental';

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import RentService from "../../API/RentService";
import {useCars} from "../../hooks/useCars";
import UserService from "../../API/UserService";

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}
const labels = {
    0.5: 'Нерабочее',
    1: 'Тяжелое',
    1.5: 'Есть недочеты',
    2: 'Рабочее',
    2.5: 'Среднее',
    3: 'Нормальное',
    3.5: 'Хорошее',
    4: 'Отличное',
    4.5: 'Идеальное',
    5: 'Наилучшее',
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: "white"
};
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function UserDashboard() {


    const {currentUserId} = useContext(AuthContext)

    const [isLoad, setIsLoad] = useState(true)

    const [cars, setCars] = useState([])
    const [sort, setSort] = useState("")
    const [query, setQuery] = useState("")
    const searchedCars = useCars(cars, query,sort)
    const [isCanRent, setIsCanRent] = useState(true)
    const [unpaidCount, setUnpaidCount] = useState(0)

    useEffect(()=>{
        const fetchShortUser = async () => {
            try{
                const response = await UserService.getShortById(currentUserId)
                setIsCanRent(
                    response.data.data.data.attributes.doc_status === 2
                    &&
                    response.data.data.data.attributes.have_card
                )
                setUnpaidCount(response.data.data.data.attributes.unpaid_count)
            }

            catch(e){
                console.log(e)
            }
        }

        fetchShortUser()

        const fetchCars = async () => {
            try{
                const response = await CarService.getRentingAll()
                setCars(response.data.data.data)
                console.log(response.data.data.data)
                setIsLoad(false)
            }
            catch(e){
                console.log(e)
                setIsLoad(false)
            }
        }
        fetchCars()
    },[])

    const [open, setOpen] = useState(false);
    const [transition, setTransition] =useState(undefined);

    const handleClose = () => {
        setOpen(false);
    };

    const startRent = (carId) =>{
        const createRent = async () => {
            try{
                let rent = {carId: carId, userId: currentUserId}
                const response = await RentService.create(rent)

                setCars(
                    cars.filter((car)=>
                        car.id !== carId
                    )
                )

                console.log(response.data.data.data)
            }
            catch(e){
                console.log(e)
            }
        }
        createRent()
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
                    message="Авто арендовано. Прокат стартовал"
                    key={transition ? transition.name : ''}
                />

                    <VuiBox display="flex" flexDirection="column" height="100%">
                        <Card  style={{marginBottom: "55px", marginTop: "30px"}}>

                        <Grid container spacing={3}>
                            <Grid item xs={8} md={8}>
                                <VuiBox display="flex" flexDirection="column" mb="24px">
                                    <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                                        Автопарк
                                    </VuiTypography>
                                    <VuiTypography color="text" variant="button" fontWeight="regular">
                                        Доступные для аренды авто
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
                                    <option value="name">По названию</option>
                                    <option value="year">По году производства</option>
                                    <option value="condition">По состоянию</option>
                                    <option value="price">По стоимости аренды</option>
                                    <option value="volume">По объему двигателя</option>
                                    <option value="created">По дате аренды</option>
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
                                !isCanRent ?
                                    <Box sx={{ display: 'flex', marginBottom: "56px"}}
                                         style={{
                                             display: 'flex',
                                             alignItems: 'center',
                                             justifyContent: 'center',
                                             height: '50vh',
                                         }}
                                    >
                                        <div style={{marginLeft: "300px", color: "white"}} >
                                            Пожалуйста, проверьте верификацию водительских прав<br/>
                                            и регистрацию платежной карты
                                        </div>
                                    </Box>
                                    :
                                    unpaidCount > 4 ?
                                        <Box sx={{ display: 'flex', marginBottom: "56px"}}
                                             style={{
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 justifyContent: 'center',
                                                 height: '50vh',
                                             }}
                                        >
                                            <div style={{marginLeft: "300px"}} >
                                                Достигнут лимит неоплаченных авто-прокатов (>4)<br/>
                                                Пожалуйста, оплатите открытые платежи
                                            </div>
                                        </Box>
                                        :

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
                                            searchedCars.length === 0 ?
                                                <Box sx={{ display: 'flex', marginBottom: "56px"}}
                                                     style={{
                                                         display: 'flex',
                                                         alignItems: 'center',
                                                         justifyContent: 'center',
                                                         height: '50vh',
                                                     }}
                                                >
                                                    <div style={{marginLeft: "400px", color: "white"}} >
                                                        Свободных авто не найдено
                                                    </div>
                                                </Box>
                                                :
                                                <>
                                                    {
                                                        searchedCars.map((car)=>
                                                            <Grid item xs={12} md={6} xl={4}>
                                                                <Card style={{backgroundColor: "#528FFF"}} sx={{ maxWidth: 500 }}>
                                                                    <CardMedia
                                                                        component="img"
                                                                        height="200"
                                                                        image={car.relationships.image.meta.url}
                                                                        alt="green iguana"
                                                                    >
                                                                    </CardMedia>
                                                                    <Grid container copacity={1}>

                                                                        <Grid item xs={5} md={5} lg={5}  mt={1}>
                                                                            <Rating
                                                                                name="hover-feedback"
                                                                                value={car.attributes.condition/2}
                                                                                precision={0.5}
                                                                                getLabelText={getLabelText}
                                                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                                readOnly />

                                                                        </Grid>
                                                                        <Grid item xs={6} md={6}   lg={6} mt={1} >
                                                                            <Typography  style={{color: "white", fontSize: "11px", marginTop: "3px", marginLeft: "8px"}}>
                                                                                {labels[car.attributes.condition/2]} состояние
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={1} md={1}   lg={1} mt={1} >
                                                                            <Tooltip title="Рассмотреть авто" placement="top">
                                                                                <a href={car.relationships.image.meta.url} target="_blank">
                                                                                    <IconButton   aria-label="add to shopping cart">
                                                                                        <Visibility />
                                                                                    </IconButton>
                                                                                </a>
                                                                            </Tooltip>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <CardContent >
                                                                        <Typography gutterBottom variant="h5" component="div" style={{color: "white"}}>
                                                                            {car.relationships.car_brand.meta.name} {car.attributes.name}
                                                                        </Typography>
                                                                        <Grid container copacity={3} >
                                                                            <Grid item xs={7} md={7}   lg={7} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    Год производства:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={5} md={5}   lg={5} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    {car.attributes.edition_year} год
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={7} md={7}   lg={7} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    В аренде с:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={5} md={5}   lg={5} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    {car.attributes.created_at}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={7} md={7}   lg={7} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    Объем двигателя:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={5} md={5}   lg={5} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    {car.attributes.engine_volume} куб. л.
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={7} md={7}   lg={7} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    Изготовитель:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={5} md={5}   lg={5} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    "{car.relationships.car_brand.meta.name}"
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={7} md={7}   lg={7} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    Тип топлива:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={5} md={5}   lg={5} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    {car.relationships.fuel_type.meta.name}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={7} md={7}   lg={7} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    Стоимость аренды:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={5} md={5}   lg={5} >
                                                                                <Typography variant="body2" color="text.secondary" style={{color: "white", fontSize: "14px"}}>
                                                                                    {car.attributes.price_per_min} y.e./мин
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </CardContent>
                                                                    <CardActionArea>
                                                                        <Tooltip title="Стартовать прокат авто" placement="top">
                                                                            <IconButton onClick={()=>startRent(car.id)} style={{backgroundColor: "#80ADFF"}} aria-label="add to shopping cart">
                                                                                <CarRental />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </CardActionArea>
                                                                </Card>
                                                            </Grid>
                                                        )
                                                    }

                                                </>
                            }
                        </Grid>
                    </VuiBox>

                <Footer/>
            </DashboardLayout>
        </>
    );
}

export default UserDashboard;
