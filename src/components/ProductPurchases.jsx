import { Grid, Typography, Paper, Link,Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const ProductPurchases = ({ purchases }) => {
    const customersData = useSelector((state) => state.customers)
    if (purchases.length != 0) {
        return (
            <>
                <Grid container spacing={1}>
                    {purchases.map(purch => {
                        const index = customersData.findIndex(customer => purch.CustomerID === customer.customerId)
                        return (
                            <Grid item key={purch.purchaseId} xs={12}>
                                <Paper sx={{ p: 1, backgroundColor: "#F0F8FF" }}>
                                    <Link underline='hover' href={`/EditCustomer/${customersData[index].customerId}`}>
                                        <Typography variant='body2'>{customersData[index].FirstName} {customersData[index].LastName}</Typography>
                                    </Link>
                                    <Typography variant='body2'><b>Date purchased:</b> {purch?.DatePurchased}</Typography>
                                </Paper>
                            </Grid>


                        )
                    }



                    )}

                </Grid>

            </>
        )
    }
    return (
        <>
            <Typography>No Customers</Typography>
        </>
    )
}

export default ProductPurchases
