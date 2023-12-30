import { Container, Typography, TextField, Stack, Button, Box, Modal, Grid, Select, MenuItem, FormControl, FormLabel } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { query, onSnapshot, doc, updateDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import db from "../firebase";
import "../style.css"
import CustomerPurchases from '../components/CustomerPurchases';

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
export default function EditCustomer() {

  const purchasesData = useSelector((state) => state.purchases)
  const productsData = useSelector((state) => state.products)
  const customersData = useSelector((state) => state.customers)

  const { id } = useParams();

  const dispatch = useDispatch();



  const [openModal, setOpenModal] = useState(false)
  const [showAddPurchButton, setShowAddPurchButton] = useState(false)
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [customer, setCustomer] = useState({ customerId: "", City: "", FirstName: "", LastName: "" });
  const [product, setProduct] = useState({ productId: "", Name: "", Price: 0, Quantity: 0 })
  const date = new Date();


  const deletePurchasesByCustomerID = async (documentIds) => {
    const deleteOperations = documentIds.map(async (docId) => {
      const docRef = doc(db, 'Purchases', docId);

      try {
        await deleteDoc(docRef);
        console.log(`Purchase ${docId} deleted successfully`);
      } catch (error) {
        console.log(`Error deleting Purchase with ID ${docId}: `, error);
      }
    });

    try {
      await Promise.all(deleteOperations);
      alert('All relevent Purchases deleted successfully');
    } catch (error) {
      alert('Error deleting: ', error);
    }
  };







  useEffect(() => {
    const fetchData = () => {
      const q = query(doc(db, "Customers", id));
      onSnapshot(q, (res) => {
        setCustomer({ customerId: res.id, ...res.data() })

      })
    }

    fetchData();





  }, [id]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    await updateDoc(doc(db, 'Customers', id), customer);

    navigate("/")
  }

  const handleDelete = async () => {
    const purchases=purchasesData.filter(purch=>purch.CustomerID===id)
    const purchasesIDsToDelete=purchases.map(p=>p.purchaseId)
    deletePurchasesByCustomerID(purchasesIDsToDelete)
    try {
      await deleteDoc(doc(db, "Customers", id))
      navigate("/Customers")
    } catch (error) {
      alert('Error deleting Customer: ', error);
    }


  }

  const handleChange = (e) => {
    if (e.target.value !== "") {
      const prodData = productsData.find(prod => prod.productId === e.target.value)
      setProduct(prodData)
      setShowAddPurchButton(true)
    }

  };

  const addProduct = () => {
    if (product.productId !== "") {
      const purchase = { CustomerID: id, DatePurchased: date.toLocaleDateString("en-GB"), ProductID: product.productId, Status: "New" }
      dispatch({ type: "ADD_PURCH", payload: purchase })
      setShowSaveButton(true)
    }
  }



  const handleSave = async () => {
    const purchasesAdd = purchasesData.filter(purch => purch.Status === "New")
    if (purchasesAdd.length !== 0) {
      purchasesAdd.forEach(purch => {
        const obj = { CustomerID: id, DatePurchased: purch.DatePurchased, ProductID: purch.ProductID }
        addDoc(collection(db, 'Purchases'), obj);

        const productToUpdate = productsData.find(prod => prod.productId === purch.ProductID)
        productToUpdate.Quantity -= 1
        updateDoc(doc(db, 'Products', purch.ProductID), productToUpdate);
        setShowAddPurchButton(false)
        setShowSaveButton(false)
        setProduct({productId: "", ...{}})

      })



      alert(" Your Purchases were succefully saved")


    }
    else {
      alert(" No Purchas was added")
    }


  }

  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid container spacing={1} >
        <Grid item xs={4} >
          <Typography
            variant='h4'
            gutterBottom
          >
            Customer Detailes:
          </Typography>
          <form
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <Container className='formField'>
              <TextField

                label="First Name"
                value={customer?.FirstName}
                variant='outlined'
                color="success"
                required
                focused
                onInput={(e) => setCustomer({ ...customer, FirstName: e.target.value })}

              />

            </Container>

            <Container className='formField'>
              <TextField

                label="Last Name"
                value={customer?.LastName}
                variant='outlined'
                color="success"
                required
                focused
                onInput={(e) => setCustomer({ ...customer, LastName: e.target.value })}

              />

            </Container>

            <Container className='formField'>
              <TextField

                label="City"
                value={customer?.City}
                variant='outlined'
                color="success"
                required
                focused
                onInput={(e) => setCustomer({ ...customer, City: e.target.value })}

              />

            </Container>

            <Stack direction="row" spacing={5} sx={{ p: 2 }} >
              <Button
                sx={{ textTransform: "none" }}
                variant="outlined"
                color='success'
                startIcon={<DeleteIcon />}
                onClick={() => setOpenModal(true)}
              >
                Delete
              </Button>

              <Button sx={{ textTransform: "none" }} variant="contained" color='success' type='submit'>
                Update
              </Button>
            </Stack>
          </form>

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
          >
            <Box sx={styleModal}>
              <Typography variant='h6' gutterBottom>Are You sure you want to delete {customer.FirstName} {customer.LastName}?<br />This will delete all relevent purchases</Typography>
              <Stack direction="row" spacing={5} gutterBottom >
                <Button
                  sx={{ textTransform: "none" }}
                  variant="contained"
                  color="success"
                  onClick={handleDelete}
                >
                  Yes
                </Button>

                <Button sx={{ textTransform: "none" }} color="success" variant='contained' onClick={() => setOpenModal(false)} >
                  No

                </Button>
              </Stack>
            </Box>
          </Modal>

        </Grid>
        <Grid item xs={4}>
          <Typography
            variant='h4'
            gutterBottom
          >
            Purchases:

          </Typography>
          <CustomerPurchases customerId={id} />

        </Grid >

        <Grid item xs={4}>
          <Typography
            variant='h4'
            gutterBottom
          >
            Add Purchase:

          </Typography>
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
          </FormControl><br />
          {showAddPurchButton &&
            <Button
              sx={{ m: 1, textTransform: "none" }}
              variant='contained'
              size='large'
              onClick={addProduct}
            >
              Add Purchase
            </Button>
          }
          {showSaveButton &&
            <Button sx={{ m: 1, textTransform: "none" }}
              size='large'
              variant='contained'
              onClick={handleSave}
            >
              Save
            </Button>
          }

        </Grid>



      </Grid>

      {/* <Container sx={{ m: 1, width: "40%", float: "right" }} >



      </Container> */}




    </Container>


  )
}

