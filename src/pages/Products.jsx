import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { } from '@mui/material/Typography'
import { Typography, Container, Grid } from '@mui/material';
import CardProduct from '../components/CardProduct';


function Products() {
    const productsData = useSelector((state) => state.products)
    const customersData = useSelector((state) => state.customers)
    const purchasesData = useSelector((state) => state.purchases)
    console.log(purchasesData)




    return (
        <Container sx={{marginTop:10}}>
            <Container sx={{ backgroundColor: "#f8f8f9" }}>
                <Container sx={{ textAlign: "center", border: "solid blue", width: "50%", color: "blue", p: 3 }}>
                    <Typography
                        variant='h4'
                        gutterBottom
                    >
                        Total amount of purchases: {purchasesData.length}
                    </Typography>
                </Container>

                <Typography
                    variant='h3'
                    align='center'
                    gutterBottom
                >
                    Products:
                </Typography>
                <Container sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        {productsData.map(prod => (
                            <Grid item key={prod.productId} xs={6} sm={4}>
                                <CardProduct product={prod} />

                            </Grid>
                        ))}


                    </Grid>
                </Container>






            </Container>
        </Container>

    )
}

export default Products


