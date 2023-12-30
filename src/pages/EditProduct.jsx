import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Container, TextField, Typography, Stack, Button, Box, Modal, Fade } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from "../firebase";
import "../style.css"


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




const EditProduct = () => {

  const purchasesData = useSelector((state) => state.purchases)
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false)
  const [product, setProduct] = useState({})

  const deletePurchasesByProductId = async (documentIds) => {
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
      const q = query(doc(db, "Products", id));
      onSnapshot(q, (res) => {
        setProduct({ productId: res.id, ...res.data() })

      })
    }

    fetchData();



  }, [id]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, 'Products', id), product);

    navigate("/")

  }
  const handleDelete = async () => {

    const purchases=purchasesData.filter(purch=>purch.ProductID===id)
    const purchasesIDsToDelete=purchases.map(p=>p.purchaseId)
    deletePurchasesByProductId(purchasesIDsToDelete)
    try {
      await deleteDoc(doc(db, "Products", id))
      navigate("/")
    } catch (error) {
      alert('Error deleting this product: ', error);
    }

  }



  return (
    <Container sx={{ marginTop: 10 }}>
      <Container sx={{ textAlign: "center", border: "solid", padding: "50px" }}>
        <Typography
          variant='h4'
          align='center'
          gutterBottom
        >
          Edit Product:
        </Typography>
        <form

          autoComplete='off'
          onSubmit={handleSubmit}


        >
          <Container className='formField'>
            <TextField

              label="Name"
              value={product?.Name}
              variant='outlined'
              color="secondary"
              required
              focused
              onInput={(e) => setProduct({ ...product, Name: e.target.value })}

            />

          </Container>

          <Container className='formField'>
            <TextField
              value={product?.Price}
              type='number'
              variant='outlined'
              color="secondary"
              required="true"
              label="Price"
              focused
              onInput={(e) => setProduct({ ...product, Price: +e.target.value })}


            />

          </Container>

          <Container className='formField'>
            <TextField
              value={product?.Quantity}
              type='number'
              variant='outlined'
              color="secondary"
              required
              label="Quantity"
              focused
              onInput={(e) => setProduct({ ...product, Quantity: +e.target.value })}




            />

          </Container>

          <Container sx={{ textAlign: "center" }}>
            <Stack direction="row" spacing={5} gutterBottom >
              <Button
                sx={{ textTransform: "none" }}
                variant="outlined"
                color='secondary'
                startIcon={<DeleteIcon />}
                onClick={() => setOpenModal(true)}
              >
                Delete
              </Button>

              <Button sx={{ textTransform: "none" }} variant="contained" color='secondary' type='submit'>
                Update
              </Button>
            </Stack>

            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
            >
              <Box sx={styleModal}>
                <Typography variant='h6' gutterBottom>Are You sure you want to delete this product?</Typography>
                <Stack direction="row" spacing={5} gutterBottom >
                  <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    onClick={handleDelete}
                  >
                    Yes
                  </Button>

                  <Button sx={{ textTransform: "none" }} variant="contained" onClick={() => setOpenModal(false)} >
                    No

                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Container>


        </form>


      </Container>
    </Container>

  )
}


export default EditProduct
