import { Container, Grid, Typography, Link, Select, MenuItem, TextField, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const Purchases = (props) => {

    const customersData = useSelector((state) => state.customers)
    const purchasesData = useSelector((state) => state.purchases)
    const productsData = useSelector((state) => state.products)

    const [filteredPurchases, setFilteredPurchases] = useState(purchasesData);

    const [product, setProduct] = useState({ productId: "", ...{} })
    const [customer, setCustomer] = useState({ customerId: "", ...{} })
    const [datePurchased, setDatePurchased] = useState("")

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let rows = [];

    useEffect(() => {
        const temp = async () => {
            const query = await props.callback1()
            const arr = await props.callback2(query)
            setFilteredPurchases(arr)
        }
        temp()

    }, [])

    const createRows = () => {
        if (filteredPurchases !== null) {
            filteredPurchases.map(purch => {
                let obj = { purchId: "", prodId: "", prodName: "", custId: "", custName: "", purchDate: "" }
                obj.purchId = purch.purchaseId
                obj.purchDate = purch.DatePurchased
                const prod = productsData.find(p => p.productId === purch.ProductID)
                obj.prodId = prod.productId
                obj.prodName = prod.Name
                const cust = customersData.find(c => c.customerId === purch.CustomerID)
                obj.custId = cust.customerId
                obj.custName = cust.FirstName + " " + cust.LastName

                rows.push(obj)

            })
        }
    }
    createRows();

    useEffect(() => {
        if (filteredPurchases === null)
            setFilteredPurchases(purchasesData)

    }, []);








    const handleChangeProduct = (e) => {
        if (e.target.value !== "") {
            const prodData = productsData.find(prod => prod.productId === e.target.value)
            setProduct(prodData)
            if (customer.customerId === "" && datePurchased === "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.ProductID === prodData.productId))
            }
            else if (datePurchased === "" && customer.customerId !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.ProductID === prodData.productId && purch.CustomerID === customer.customerId))
            }
            else if (customer.customerId === "" && datePurchased !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.ProductID === prodData.productId && datePurchased === purch.DatePurchased))
            }
            else {
                setFilteredPurchases(purchasesData.filter(purch => purch.DatePurchased === datePurchased && purch.ProductID === prodData.productId && purch.CustomerID === customer.customerId))
            }

        }
        else {
            setProduct({ productId: "", ...{} })
            if (customer.customerId === "" && datePurchased === "") {
                setFilteredPurchases(purchasesData)
            }
            else if (datePurchased === "" && customer.customerId !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.CustomerID === customer.customerId))
            }
            else if (customer.customerId === "" && datePurchased !== "") {
                setFilteredPurchases(purchasesData.filter(purch => datePurchased === purch.DatePurchased))
            }
            else {
                setFilteredPurchases(purchasesData.filter(purch => purch.CustomerID === customer.customerId && datePurchased === purch.DatePurchased))
            }
        }
        setPage(0);

    };

    const handleChangeDatePurchased = (e) => {
        const date = new Date(e.target.value)
        // const formattedDate = date.toLocaleDateString("en-GB");
        // setDatePurchased(formattedDate)        
        if (e.target.value !== "") {
            const formattedDate = date.toLocaleDateString("en-GB");
            setDatePurchased(formattedDate)
            if (customer.customerId === "" && product.productId === "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.DatePurchased === formattedDate))
            }
            else if (product.productId === "" && customer.customerId !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.DatePurchased === formattedDate && purch.CustomerID === customer.customerId))
            }
            else if (customer.customerId === "" && product.productId !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.ProductID === product.productId && formattedDate === purch.DatePurchased))
            }
            else {
                setFilteredPurchases(purchasesData.filter(purch => purch.DatePurchased === formattedDate && purch.ProductID === product.productId && purch.CustomerID === customer.customerId))
            }

        }
        else {
            setDatePurchased("")
            if (customer.customerId === "" && product.productId === "") {
                setFilteredPurchases(purchasesData)
            }
            else if (product.productId === "" && customer.customerId !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.CustomerID === customer.customerId))
            }
            else if (customer.customerId === "" && product.productId !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.ProductID === product.productId))
            }
            else {
                setFilteredPurchases(purchasesData.filter(purch => purch.CustomerID === customer.customerId && purch.ProductID === product.productId))
            }
        }
        setPage(0);

    }

    const handleChangeCustomer = (e) => {
        if (e.target.value !== "") {
            const custData = customersData.find(cust => cust.customerId === e.target.value)
            setCustomer(custData)
            if (product.productId === "" && datePurchased === "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.CustomerID === custData.customerId))
            }
            else if (datePurchased === "" && product.productId !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.CustomerID === custData.customerId && purch.ProductID === product.productId))
            }
            else if (product.productId === "" && datePurchased !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.CustomerID === custData.customerId && datePurchased === purch.DatePurchased))
            }
            else {
                setFilteredPurchases(purchasesData.filter(purch => purch.DatePurchased === datePurchased && purch.ProductID === product.productId && purch.CustomerID === custData.customerId))
            }
        }
        else {
            setCustomer({ customerId: "", ...{} })
            if (product.productId === "" && datePurchased === "") {
                setFilteredPurchases(purchasesData)
            }
            else if (datePurchased === "" && product.productId !== "") {
                setFilteredPurchases(purchasesData.filter(purch => purch.ProductID === product.productId))
            }
            else if (product.productId === "" && datePurchased !== "") {
                setFilteredPurchases(purchasesData.filter(purch => datePurchased === purch.DatePurchased))
            }
            else {
                setFilteredPurchases(purchasesData.filter(purch => purch.ProductID === product.productId && datePurchased === purch.DatePurchased))
            }
        }
        setPage(0);

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (


        <Container sx={{ marginTop: 10, marginRight: 5 }}>
            <Typography
                variant='h3'
                align='center'
                gutterBottom
            >
                Purchases

            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Select
                        value={product.productId}
                        displayEmpty
                        onChange={handleChangeProduct}
                        sx={{ width: 200 }}

                    >
                        <MenuItem value="">
                            <em>All products</em>
                        </MenuItem>
                        {productsData.map(prod => {
                            return (
                                <MenuItem key={prod.productId}
                                    value={prod.productId}
                                >
                                    {prod.Name}
                                </MenuItem>
                            )

                        })}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <Select
                        value={customer.customerId}
                        displayEmpty
                        onChange={handleChangeCustomer}
                        sx={{ width: 200 }}
                    >
                        <MenuItem value="">
                            <em>All Customers</em>
                        </MenuItem>
                        {customersData.map(cust => {
                            return (
                                <MenuItem key={cust.customerId}
                                    value={cust.customerId}
                                >
                                    {cust.FirstName} {cust.LastName}
                                </MenuItem>
                            )

                        })}

                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        type='date'
                        sx={{ width: 200 }}
                        onChange={handleChangeDatePurchased}
                    />


                </Grid>


            </Grid>

            <Paper sx={{ m: 2, width: '80%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: "#8BABF7  ", color: "white" }}><b>Product Name</b></TableCell>
                                <TableCell sx={{ backgroundColor: "#8BABF7  ", color: "white" }}><b>Customer Name</b></TableCell>
                                <TableCell sx={{ backgroundColor: "#8BABF7  ", color: "white" }}><b>Purchas Date</b> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                        <TableRow key={row.purchaseId} hover role="checkbox">
                                            <TableCell>
                                                <Link href={`/EditProduct/${row.prodId}`} underline='hover'>
                                                    {row.prodName}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/EditCustomer/${row.custId}`} underline='hover'>
                                                    {row.custName}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{row.purchDate}</TableCell>
                                        </TableRow>

                                    )

                                })
                            }
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



    )
}

export default Purchases
