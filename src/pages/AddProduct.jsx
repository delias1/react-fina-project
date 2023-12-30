import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Typography, Stack, Button } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { addDoc, collection } from 'firebase/firestore';
import db from "../firebase";
import "../style.css"





export default function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "Products"), product)
        navigate("/")
    }
    return (
        <Container sx={{marginTop: 10}}>
        <div style={{ textAlign: "center", border: "solid blue", padding: "50px" }}>
            <Typography
                variant='h4'
                align='center'
                gutterBottom
                color="primary"
            >
                Add New Product:
            </Typography>
            <form
                autoComplete='off'
                onSubmit={handleSubmit}
            >

                <Container className='formField'>
                    <TextField

                        label="Name"
                        variant='outlined'
                        className='formField'
                        required
                        onInput={(e) => setProduct({ ...product, Name: e.target.value })}

                    />

                </Container>

                <Container className='formField'>
                    <TextField
                        type='number'
                        variant='outlined'
                        label="Price"
                        required
                        onInput={(e) => setProduct({ ...product, Price: +e.target.value })}


                    />

                </Container>

                <Container className='formField'>
                    <TextField
                        type='number'
                        className='formField'
                        label="Quantity"
                        required
                        onInput={(e) => setProduct({ ...product, Quantity: +e.target.value })}




                    />

                </Container>

                <Container sx={{ textAlign: "center" }}>
                    <Stack direction="row" spacing={5} gutterBottom >
                        <Button
                            variant="outlined"
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            type='submit'
                            startIcon={<SaveOutlinedIcon />}

                        >
                            Save
                        </Button>
                    </Stack>


                </Container>
            </form>
        </div>
        </Container>
    )
}

