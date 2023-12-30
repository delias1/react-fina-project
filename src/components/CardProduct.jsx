import { Button, Card, CardActions, CardContent, CardHeader, Link, Typography, Collapse, Container, Paper, Grid } from '@mui/material'
import { query, onSnapshot, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import db from "../firebase";
import React from 'react'
import ProductPurchases from './ProductPurchases';

const CardProduct = ({ product }) => {
    let id = product.productId;
    const [prodPurchases, setProdPurchases] = useState([])
    const p = useSelector((state) => state.purchases);
    const purchases = p.filter((prodPerchase) => prodPerchase.ProductID === product.productId)
    // setProdPurchases(purchases)
    // setPurchases(prodPurchases)


    const [expanded, setExpanded] = React.useState(false);




    const handleExpandClick = () => {
        setExpanded(!expanded);
        // const purchases = p.filter((prodPerchase) => prodPerchase.ProductID == product.productId)
        // setProdPurchases(purchases)
        // const d = p[0].DatePurchased.toDate();
        // const date = new Date(d)
        // console.log(d.toLocaleDateString('en-GB'));

    };
    return (
        <div>
            <Card>
                <Link href={`/EditProduct/${id}`} underline='hover' >
                    <CardHeader title={product.Name} >
                    </CardHeader>
                </Link>
                <CardContent >
                    <Typography><b>Price: </b>{product.Price}</Typography>
                    <Typography><b>Quntity: </b>{product.Quantity}</Typography>

                    <CardActions disableSpacing>

                        <Button onClick={handleExpandClick}>Customers bought this product</Button>
                    </CardActions>
                    <Container  >
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent  >
                                <ProductPurchases purchases={purchases} />
                                
                            </CardContent>

                        </Collapse>
                    </Container>



                </CardContent>



            </Card>



        </div>
    )
}

export default CardProduct
