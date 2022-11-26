import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import CarService from "../../API/CarService";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';



import Grid from "@mui/material/Grid";

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

export default function CarModal({carInfoOpen, setCarInfoOpen, carId }) {

    const [car, setCar] = useState(null)
    const [isLoad, setIsLoad] = useState(true)
    const [condValue, setCondValue] = useState(8);

    useEffect(()=>{
        setIsLoad(true)
        const fetchCar = async () => {
            try{
                const response = await CarService.getById(carId)
                setCar(response.data.data.data)
                console.log(response.data.data.data)
                setIsLoad(false)
            }
            catch(e){
                setIsLoad(false)
                console.log(e)
            }
        }
        if(carId !== null)
        {fetchCar()}


    },[carId])

    return (
        <div>
            {
                car !== null && ! isLoad ?
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={carInfoOpen}
                        onClose={()=>{setCarInfoOpen(false)}}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={carInfoOpen}>
                            <Box sx={style}>
                                <Card style={{backgroundColor: "#528FFF"}} sx={{ maxWidth: 500 }}>

                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={car.relationships.image.meta.url}
                                            alt="green iguana"
                                        />
                                        <Grid container copacity={1}>
                                            <Grid item xs={4} md={4} lg={4}>
                                                <Typography sx={{ fontSize: 13 }} mt={1} style={
                                                    ! car.attributes.ready_to_rent ?
                                                        {color: "#9A3FFC"}
                                                        :
                                                        null

                                                } gutterBottom>
                                                    {
                                                        ! car.attributes.ready_to_rent ?
                                                            "В ремонте"
                                                            :
                                                            null
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} md={3} lg={3}  mt={1}>
                                                <Rating
                                                    name="hover-feedback"
                                                    value={car.attributes.condition/2}
                                                    precision={0.5}
                                                    getLabelText={getLabelText}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                    readOnly />

                                            </Grid>
                                            <Grid item xs={5} md={5}   lg={5} mt={1} >
                                                <Typography  style={{color: "white", fontSize: "11px", marginTop: "3px", marginLeft: "8px"}}>
                                                    {labels[car.attributes.condition/2]} состояние
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <CardContent >
                                            <Typography gutterBottom variant="h5" component="div" style={{color: "white"}}>
                                                {car.relationships.car_brand.meta.name} {car.attributes.name}
                                            </Typography>
                                            <Grid container copacity={3}>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        Год производства:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        {car.attributes.edition_year} год
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        В аренде с:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        {car.attributes.created_at}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        Объем двигателя:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        {car.attributes.engine_volume} куб. л.
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        Изготовитель:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        "{car.relationships.car_brand.meta.name}"
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        Тип топлива:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        {car.relationships.fuel_type.meta.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        Стоимость аренды:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} md={6}   lg={6} >
                                                    <Typography variant="body2" color="text.secondary" style={{color: "white"}}>
                                                        {car.attributes.price_per_min} y.e./мин
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                        </CardContent>
                                    <CardActionArea>

                                    </CardActionArea>
                                </Card>
                            </Box>
                        </Fade>
                    </Modal>
                    :
                    null
            }

        </div>
    );
}
