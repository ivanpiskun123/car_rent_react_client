import {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext";
import UserService from "../../API/UserService";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import VuiInput from "../../components/VuiInput";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';

import Card from "@mui/material/Card";
import { Icon } from "@mui/material";
import Footer from "../../examples/Footer";
import VuiBox from "../../components/VuiBox";
import VuiTypography from "../../components/VuiTypography";
import welcome from "../../assets/images/welcome-profile.png";
import CarInformations from "../profile/components/CarInformations";
import profile1 from "../../assets/images/profile-1.png";
import DefaultProjectCard from "../../examples/Cards/ProjectCards/DefaultProjectCard";
import DefaultAdminProjectCard from "../../examples/Cards/ProjectCards/DefaultAdminProjectCard";
import {useUsers} from "../../hooks/useUsers";

function Users() {

    const [users, setUsers] = useState([])
    const [query, setQuery] = useState("")
    const searchedUsers = useUsers(users,query)
    const [isLoad, setIsLoad] = useState(true)

    useEffect(()=>{

        const fetchUsers = async () => {
            try{
                const response = await UserService.getAll()
                console.log(response.data.data.data)
                setUsers(response.data.data.data)
                setIsLoad(false)
            }
            catch(e){
                console.log(e)
                setIsLoad(false)
            }
        }
        fetchUsers()

    }, [])

    const [open, setOpen] = useState(false);
    const [approveOpen, setApproveOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [transition, setTransition] =useState(undefined);

    const handleClose = () => {
        setOpen(false);
    };




    const rejectDoc=(userId) =>{
        const reject = async () => {
            try{
                const response = await UserService.rejectDocByUserId(userId)
                setUsers(
                    users.map((c)=>{
                        if(c.id===userId)
                        {
                            return {...c, relationships: {...c.relationships,
                                    document: {...c.relationships.document,
                                        meta: {...c.relationships.document.meta,status: 0}
                                    }}}
                        }
                        return c
                    })
                )
                console.log(response.data.data.data)
                setRejectOpen(true)
            }
            catch(e){
                console.log(e)
            }
        }
        reject()
    }

    const approveDoc=(userId) =>{
        const approve = async () => {
            try{
                const response = await UserService.approveDocByUserId(userId)
                setUsers(
                    users.map((c)=>{
                        if(c.id===userId)
                        {
                            return {...c, relationships: {...c.relationships,
                                    document: {...c.relationships.document,
                                        meta: {...c.relationships.document.meta,status: 2}
                                    }}}
                        }
                        return c

                    })
                )
                console.log(response.data.data.data)
                setApproveOpen(true)
            }
            catch(e){
                console.log(e)
            }
        }
        approve()
    }

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <Snackbar
                    open={approveOpen}
                    onClose={handleClose}
                    TransitionComponent={transition}
                    message="Водительские права верифицированы"
                    key={transition ? transition.name : ''}
                />
                <Snackbar
                    open={rejectOpen}
                    onClose={handleClose}
                    TransitionComponent={transition}
                    message="Верификация водительских прав не пройдена"
                    key={transition ? transition.name : ''}
                />

                    <VuiBox display="flex" flexDirection="column" height="100%">

                        <Card  style={{marginBottom: "55px", marginTop: "3px"}}>
                        <Grid container spacing={3}>
                            <Grid item xs={8} md={8}>
                                <VuiBox display="flex" flexDirection="column" mb="24px">
                                    <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                                        Пользователи
                                    </VuiTypography>
                                    <VuiTypography color="text" variant="button" fontWeight="regular">
                                        Информация обо всех пользователях сайта
                                    </VuiTypography>
                                </VuiBox>
                            </Grid>
                            <Grid item xs={2} md={2}>

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
                                            searchedUsers.length === 0 ?
                                                <Box sx={{ display: 'flex', marginBottom: "56px"}}
                                                     style={{
                                                         display: 'flex',
                                                         alignItems: 'center',
                                                         justifyContent: 'center',
                                                         height: '50vh',
                                                     }}
                                                >
                                                    <div style={{marginLeft: "400px", color: "white"}} >
                                                        Пользователей не найдено
                                                    </div>
                                                </Box>
                                                :
                                                <>
                                                <Grid
                                                    container
                                                    spacing={3}
                                                    sx={({ breakpoints }) => ({
                                                        [breakpoints.only("xl")]: {
                                                            gridTemplateColumns: "repeat(2, 1fr)",
                                                        },
                                                    })}
                                                >
                                                {
                                                    searchedUsers.map((user)=>
                                                        <>
                                                            <Grid
                                                                item
                                                                xl={3}
                                                                style={{marginBottom: "30px"}}
                                                            >
                                                        <Card
                                                            sx={({ breakpoints }) => ({
                                                                background: `url(${user!== null ? user.relationships.image.meta.url : welcome})`,
                                                                backgroundSize: "cover",
                                                                borderRadius: "20px",
                                                                height: "100%",
                                                                width: "100%",

                                                            })}
                                                        >
                                                            <VuiBox display="flex" flexDirection="column" sx={{ height: "100%" }}>
                                                                <VuiBox display="flex" flexDirection="column" mb="auto">
                                                                    <VuiTypography color="#080841" variant="h3" fontWeight="bold" mb="3px">
                                                                        {user.attributes.first_name} {user.attributes.second_name}
                                                                    </VuiTypography>
                                                                </VuiBox>
                                                            </VuiBox>
                                                        </Card>
                                                    </Grid>

                                                            <Grid
                                                                item
                                                                xl={5}
                                                                sx={({ breakpoints }) => ({
                                                                    [breakpoints.only("xl")]: {
                                                                        gridArea: "2 / 1 / 3 / 3",
                                                                    },
                                                                })}
                                                            >
                                                                <CarInformations user={user} />
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xl={4}
                                                                sx={({ breakpoints }) => ({
                                                                    [breakpoints.only("xl")]: {
                                                                        gridArea: "2 / 1 / 3 / 3",
                                                                    },
                                                                })}
                                                            >
                                                                <DefaultAdminProjectCard
                                                                    image={ (user.relationships.document.meta.url === null || user.relationships.document.meta.url === "") ? profile1 : user.relationships.document.meta.url}
                                                                    label="Загружено с Cloudinary"
                                                                    title={
                                                                            user.relationships.document.meta.status === 2 ?
                                                                                "Права верифицированы"
                                                                                :
                                                                                user.relationships.document.meta.status === 1 &&
                                                                                (user.relationships.document.meta.url !== null && user.relationships.document.meta.url !== "") ?
                                                                                    "В процессе верификации" :
                                                                                    "Верификация не пройдена. Ожидается новое фото"
                                                                    }

                                                                    user = {user}
                                                                    setUser = {null}
                                                                    rejectDoc={rejectDoc}
                                                                    approveDoc={approveDoc}
                                                                />
                                                            </Grid>
                                                        </>
                                                    )

                                                }
                                                </Grid>
                                                </>
                            }
                        </Grid>

                    </VuiBox>


                <Footer/>

            </DashboardLayout>
        </>
    )
}

export default Users;
