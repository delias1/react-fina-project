import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Typography, Stack, Button, getBackdropUtilityClass } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { addDoc, collection } from 'firebase/firestore';
import db from "../firebase";
import "../style.css"

const AddCustomer = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "Customers"), customer)
        alert("Customer Added Successfully")
        navigate("/Customers")
    }
    return (
        <Container sx={{marginTop:10}}>
            <Container sx={{ textAlign: "center", border: "solid green", padding: "50px" }}>
                <Typography
                    variant='h4'
                    align='center'
                    gutterBottom
                    color="success"
                >
                    Add New Customer:
                </Typography>
                <form
                    autoComplete='off'
                    onSubmit={handleSubmit}
                >

                    <Container className='formField'>
                        <TextField
                            type="text"
                            label="First Name"
                            variant='outlined'
                            className='formField'
                            color="success"
                            required
                            onInput={(e) => setCustomer({ ...customer, FirstName: e.target.value })}
                        />
                    </Container>

                    <Container className='formField'>
                        <TextField
                            type='text'
                            variant='outlined'
                            label="Last Name"
                            required
                            onInput={(e) => setCustomer({ ...customer, LastName: e.target.value })}


                        />

                    </Container>

                    <Container className='formField'>
                        <TextField
                            type='text'
                            className='formField'
                            label="City"
                            required
                            onInput={(e) => setCustomer({ ...customer, City: e.target.value })}




                        />

                    </Container>

                    <Container sx={{ textAlign: "center" }}>
                        <Stack direction="row" spacing={5} gutterBottom >
                            <Button
                                variant="outlined"
                                color='success'
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                color='success'
                                type='submit'
                                startIcon={<SaveOutlinedIcon />}
                            >
                                Save
                            </Button>
                        </Stack>


                    </Container>
                </form>
            </Container>
        </Container>
    )
}

export default AddCustomer



