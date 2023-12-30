import { Box, Button, Container, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, FormControl, MenuItem, Select, Link } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import db from "../firebase";
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Customers = () => {
    const customersData = useSelector((state) => state.customers)
    const purchasesData = useSelector((state) => state.purchases)
    const productsData = useSelector((state) => state.products)

    const navigate = useNavigate();

    const date = new Date

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let rows = [];


    const [openModal, setOpenModal] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const [customer, setCustomer] = useState({})
    const [product, setProduct] = useState({ productId: "", ...{} })

    const openAddProductModal = (id) => {

        setOpenModal(true)
        setProduct({ productId: "", ...{} })
        const customerSelected = customersData.find(cust => cust.customerId === id)
        setCustomer(customerSelected)
        setShowSaveButton(false)
    }
    const closeAddProductModal = () => {
        setOpenModal(false)



    }

    const handleSave = async () => {

        if (product.productId !== "") {
            const obj = { CustomerID: customer.customerId, DatePurchased: date.toLocaleDateString("en-GB"), ProductID: product.productId }
            addDoc(collection(db, 'Purchases'), obj);
            const quantity = product.Quantity -= 1
            setProduct({ ...product, Quantity: quantity })
            updateDoc(doc(db, 'Products', product.productId), product);

            setOpenModal(false)
            alert(" Your Purchase was succesfully saved")

        }

    }



    const handleChange = (e) => {
        if (e.target.value !== "") {
            const prodData = productsData.find(prod => prod.productId === e.target.value)
            setShowSaveButton(true)
            setProduct(prodData)


        }

    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createRows = () => {
        customersData.map(customer => {
            let obj = { custId: "", name: "", products: [] };
            const prods = [];
            obj.custId = customer.customerId
            obj.name = customer.FirstName + " " + customer.LastName
            const customerPurchases = purchasesData.filter(purch => purch.CustomerID === customer.customerId)
            customerPurchases.map(customerPurch => {
                const prod = productsData.find(p => p.productId === customerPurch.ProductID)
                prods.push({ prodId: prod.productId, name: prod.Name, datePurchased: customerPurch.DatePurchased })
                obj = { ...obj, products: prods }


            })

            rows = [...rows, obj]
        })





    }
    createRows();



    return (
        <Container sx={{ marginTop: 10 }}>
            <Typography
                variant='h3'
                align='center'
                gutterBottom

            >
                Customers:
            </Typography>

            <Container>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table stickyHeader >
                            <TableHead  >
                                <TableRow sx={{ backgroundColor: "black", color: "white", textAlign: "center" }}>
                                    <TableCell sx={{ backgroundColor: "#8BABF7  ", color: "white", textAlign: "center", fontSize: "1.5em", width: "25%" }}><b>Customer name</b> </TableCell>
                                    <TableCell sx={{ backgroundColor: "#8BABF7  ", color: "white", textAlign: "center", fontSize: "1.5em" }}><b>List of products purchased</b></TableCell>
                                    <TableCell sx={{ backgroundColor: "#8BABF7  ", color: "white", textAlign: "center", fontSize: "1.5em" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    // const customerPurchases = purchasesData.filter(purch => purch.CustomerID === customer.customerId)
                                    return (
                                        <TableRow key={row.custId} hover role="checkbox">
                                            <TableCell align='center' sx={{ fontSize: "1.2em" }}><Link href={`/EditCustomer/${row.custId}`} underline='hover'>{row.name}</Link></TableCell>
                                            <TableCell align='left'>
                                                {row.products.map(prod => {
                                                    // const prod = productsData.find(p => p.productId === customerPurch.ProductID)
                                                    return (
                                                        <Button key={prod.prodId} variant='contained'
                                                            sx={{ m: 1, backgroundColor: "grey", width: "30%", height: "100px" }}
                                                            onClick={() => navigate(`/EditProduct/${prod.prodId}`)}
                                                        >
                                                            {prod.name}<br /> {prod.datePurchased}
                                                            {/* <Paper key={customerPurch.purchaseId} sx={{ m: 1, p: 1, backgroundColor: "lightGrey", float: "left" }}><Link to={`/EditProduct/${prod.productId}`} underline='hover'>{prod.Name}</Link><br /> {customerPurch.DatePurchased}</Paper> */}
                                                        </Button>
                                                    )

                                                })


                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => openAddProductModal(row.custId)}>Buy Product</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>

                        </Table>

                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        rowsPerPage={rowsPerPage}
                        count={rows.length}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}


                    />

                </Paper>
            </Container>
            {/* To open dialog screen to add product to specific customer */}
            <Modal
                open={openModal}
                onClose={closeAddProductModal}
            >
                <Container>
                    <Box sx={styleModal}>
                        <Typography gutterBottom variant='h4'>{customer.FirstName}  {customer.LastName}</Typography>
                        {showSaveButton &&
                            <Button
                                sx={{ m: 1, textTransform: "none" }}
                                variant='contained'
                                size='large'
                                onClick={handleSave}
                            >
                                Buy The Product
                            </Button>
                        }
                        <FormControl sx={{ minWidth: 300 }}>
                            <Select
                                value={product.productId}
                                displayEmpty
                                onChange={handleChange}

                            >
                                <MenuItem value="">
                                    <em>Choose a Product</em>
                                </MenuItem>
                                {productsData.map(prod => {
                                    if (prod.Quantity > 0) {
                                        return (
                                            <MenuItem key={prod.productId}
                                                value={prod.productId}
                                            >
                                                {prod.Name}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Container>

            </Modal>

        </Container>
    )
}

export default Customers
