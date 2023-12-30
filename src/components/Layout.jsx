import { AppBar, Container, Drawer, Paper, Toolbar, Typography,Box, List, ListItem, ListItemText,Link } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const drawerWidth = 160

const menuItems=[
  {
    text: "Products",
    path: "/"
  },

  {
    text: "Customers",
    path: "/Customers"
  },

  {
    text: "Purchases",
    path: "/Purchases"
  },

  {
    text: "Add Customer",
    path: "/AddCustomer"
  },

  {
    text: "Add Product",
    path: "/AddProduct"
  },


]


export default function Layout({ children }) {
  return (
    <div>
      {/* app bar */}
      <AppBar sx={{backgroundColor: "black"}}>
        <Container sx={{width: `calc(100%-${drawerWidth})px`, backgroundColor: "black"}}>
        <Toolbar>
          <Typography variant='h5' sx={{flexGrow:1}}>
            <b> Welcome to My Final React Project</b>
          </Typography>
          <AccountCircleIcon/>
          <Typography><b>Admin</b></Typography>
        </Toolbar>
        </Container>
      </AppBar>

      {/* app Drawer */}
      <Drawer
        
        variant='permanent'
        anchor='left'
      >
        <Container sx={{ width: drawerWidth }}>
          <Typography>
            Menu
            {/* Lists of links */}
          

                {
                  menuItems.map(item=>(

                      <Link key={item.text} href={item.path} underline='hover'>
                        <ListItemText primary={item.text}/>
                      </Link>

                  ))

                }


              
            
          </Typography>
        </Container>
      </Drawer>

      <div >
        {children}
      </div>
    </div>

  )
}
