import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';





const CustomerPurchases = ({ customerId }) => {
    
    const productsData = useSelector((state) => state.products)
    const purchasesData = useSelector((state) => state.purchases)
    const [purchases, setPurchases] = useState([])

    const dispatch = useDispatch();

    // const purchasesData = store.purchases
    // const productsData = store.products

    const customerPurchases = purchasesData.filter(purch => purch.CustomerID === customerId)
    // setPurchases(customerPurchases)

    return (
        <>
            <TableContainer  component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell><b>Product Name</b></TableCell>
                            <TableCell><b>Date Purchased</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            customerPurchases.map((purch) => {
                                const index = productsData.findIndex(prod => prod.productId === purch.ProductID)
                                /*                                 const date = purch?.DatePurchased.toDate(); */
                                return (
                                    <TableRow sx={{ backgroundColor: purch.Status === "New" ? "lightblue" : "white" }} key={purch.purchaseId}>
                                        <TableCell >{productsData[index]?.Name}</TableCell>
                                        <TableCell>{purch?.DatePurchased}</TableCell>
                                        <TableCell>{purch.Status==="New" && <Button variant='contained' onClick={()=>dispatch({ type: 'DELETE_PURCH', payload: purch.purchaseId })}>Delete</Button>}</TableCell>
                                    </TableRow>
                                )
                            })
                        }



                    </TableBody>

                </Table>

            </TableContainer>

        </>
    )
}

export default CustomerPurchases
