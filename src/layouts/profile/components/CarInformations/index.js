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

import React from 'react';
import { Card, Stack, Grid } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import GreenLightning from 'assets/images/shapes/green-lightning.svg';
import WhiteLightning from 'assets/images/shapes/white-lightning.svg';
import linearGradient from 'assets/theme/functions/linearGradient';
import colors from 'assets/theme/base/colors';
import carProfile from 'assets/images/shapes/car-profile.svg';
import LineChart from 'examples/Charts/LineCharts/LineChart';
import { lineChartDataProfile1, lineChartDataProfile2 } from 'variables/charts';
import { lineChartOptionsProfile2, lineChartOptionsProfile1 } from 'variables/charts';
import CircularProgress from '@mui/material/CircularProgress';



const CarInformations = ({user}) => {
	const { gradients, info } = colors;
	const { cardContent } = gradients;

	const getUnpaidCount = (user) => {
		return user.meta.total_payments_count - user.meta.paid_payments_count
	}

	const getPercentOfLimit = (user) => {
		return getUnpaidCount(user)/5*100
	}

	return (
		<Card
			sx={({ breakpoints }) => ({
				[breakpoints.up('xxl')]: {
					maxHeight: '400px'
				}
			})}>
			<VuiBox display='flex' flexDirection='column'>
				<VuiTypography variant='lg' color='white' fontWeight='bold' mb='6px'>
					Статус аренд
				</VuiTypography>
				<VuiTypography variant='button' color='text' fontWeight='regular' mb='30px'>
					Количество неоплаченных аренд
				</VuiTypography>
				<Stack
					spacing='24px'
					background='#fff'
					sx={({ breakpoints }) => ({
						[breakpoints.up('sm')]: {
							flexDirection: 'column'
						},
						[breakpoints.up('md')]: {
							flexDirection: 'row'
						},
						[breakpoints.only('xl')]: {
							flexDirection: 'column'
						}
					})}>
					<VuiBox
						display='flex'
						flexDirection='column'
						justifyContent='center'
						sx={({ breakpoints }) => ({
							[breakpoints.only('sm')]: {
								alignItems: 'center'
							}
						})}
						alignItems='center'>
						<VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
							{
								user === null ?
									null
									:
									getUnpaidCount(user) > 2 ?
									<CircularProgress variant='determinate' value={getPercentOfLimit(user)} size={100} color='error' mr={2} />
									:
									<CircularProgress variant='determinate' value={getPercentOfLimit(user)} size={100} color='info' mr={2} />
							}

							<VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center' ml={2}>
								<VuiBox component='img' src={GreenLightning} />
								<VuiTypography color='white' variant='h2' mt='6px' fontWeight='bold' mb='4px'>
									{
										user === null ?
											0
											:
									getPercentOfLimit(user)}%
								</VuiTypography>
								<VuiTypography color='text' variant='caption'>
									Лимит неоплаченных аренд
								</VuiTypography>
							</VuiBox>
						</VuiBox>
						<VuiBox
							display='flex'
							justifyContent='center'
							flexDirection='column'
							sx={{ textAlign: 'center' }}>
							<VuiTypography color='white' variant='lg' fontWeight='bold' mb='2px' mt='18px'>
								{
									user === null ?
										0
										:
									getUnpaidCount(user)
								} аренд
							</VuiTypography>
							<VuiTypography color='text' variant='button' fontWeight='regular'>
								неоплачено
							</VuiTypography>
						</VuiBox>
					</VuiBox>
					<Grid
						container
						sx={({ breakpoints }) => ({
							spacing: '24px',
							[breakpoints.only('sm')]: {
								columnGap: '0px',
								rowGap: '24px'
							},
							[breakpoints.up('md')]: {
								gap: '24px',
								ml: '50px !important'
							},
							[breakpoints.only('xl')]: {
								gap: '12px',
								mx: 'auto !important'
							}
						})}>

						{
							user !== null ?
								<>
									<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
										<VuiBox
											display='flex'
											p='18px'
											alignItems='center'
											sx={{
												background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
												minHeight: '110px',
												borderRadius: '20px'
											}}>
											<VuiBox display='flex' flexDirection='column' mr='auto'>
												<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
													Активных аренд
												</VuiTypography>
												<VuiTypography
													color='white'
													variant='h4'
													fontWeight='bold'
													sx={({ breakpoints }) => ({
														[breakpoints.only('xl')]: {
															fontSize: '20px'
														}
													})}>
													{user.meta.active_rents_count} аренд
												</VuiTypography>
											</VuiBox>
											<VuiBox
												display='flex'
												justifyContent='center'
												alignItems='center'
												sx={{
													background: info.main,
													borderRadius: '12px',
													width: '56px',
													height: '56px'
												}}>
												<VuiBox component='img' src={carProfile} />
											</VuiBox>
										</VuiBox>
									</Grid>
									<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
										<VuiBox
											display='flex'
											p='18px'
											alignItems='center'
											sx={{
												background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
												borderRadius: '20px'
											}}>
											<VuiBox display='flex' flexDirection='column' mr='auto'>
												<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
													Закрытых платежей
												</VuiTypography>
												<VuiTypography
													color='white'
													variant='h4'
													fontWeight='bold'
													sx={({ breakpoints }) => ({
														[breakpoints.only('xl')]: {
															fontSize: '20px'
														}
													})}>
													{user.meta.paid_payments_count}
												</VuiTypography>
											</VuiBox>
											<VuiBox sx={{ maxHeight: '75px' }}>
												<LineChart
													lineChartData={lineChartDataProfile1}
													lineChartOptions={lineChartOptionsProfile1}
												/>
											</VuiBox>
										</VuiBox>
									</Grid>
									<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
										<VuiBox
											display='flex'
											p='18px'
											alignItems='center'
											sx={{
												background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
												borderRadius: '20px',
												minHeight: '110px'
											}}>
											<VuiBox display='flex' flexDirection='column' mr='auto'>
												<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
													Всего аренд
												</VuiTypography>
												<VuiTypography
													color='white'
													variant='h4'
													fontWeight='bold'
													sx={({ breakpoints }) => ({
														[breakpoints.only('xl')]: {
															fontSize: '20px'
														}
													})}>
													{user.meta.total_rents_count} аренд
												</VuiTypography>
											</VuiBox>
											<VuiBox
												display='flex'
												justifyContent='center'
												alignItems='center'
												sx={{
													background: info.main,
													borderRadius: '12px',
													width: '56px',
													height: '56px'
												}}>
												<VuiBox component='img' src={WhiteLightning} />
											</VuiBox>
										</VuiBox>
									</Grid>
									<Grid item xs={12} md={5.5} xl={5.8} xxl={5.5}>
										<VuiBox
											display='flex'
											p='18px'
											alignItems='center'
											sx={{
												background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
												borderRadius: '20px'
											}}>
											<VuiBox display='flex' flexDirection='column' mr='auto'>
												<VuiTypography color='text' variant='caption' fontWeight='medium' mb='2px'>
													Всего платежей
												</VuiTypography>
												<VuiTypography
													color='white'
													variant='h4'
													fontWeight='bold'
													sx={({ breakpoints }) => ({
														[breakpoints.only('xl')]: {
															fontSize: '20px'
														}
													})}>
													{user.meta.total_payments_count}
												</VuiTypography>
											</VuiBox>
											<VuiBox sx={{ maxHeight: '75px' }}>
												<LineChart
													lineChartData={lineChartDataProfile2}
													lineChartOptions={lineChartOptionsProfile2}
												/>
											</VuiBox>
										</VuiBox>
									</Grid>
								</>
								:
								null

						}

					</Grid>
				</Stack>
			</VuiBox>
		</Card>
	);
};

export default CarInformations;
