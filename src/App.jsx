import { useState, useEffect } from 'react'
import { Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from "./firebase";





import Products from "./pages/products";
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';
import EditCustomer from './pages/EditCustomer';
import AddCustomer from './pages/AddCustomer';
import Customers from './pages/Customers';
import Layout from './components/Layout';
import Purchases from './pages/Purchases';


function App() {
  const dispatch = useDispatch();
  const snapQuery = async (q, nameItem) => {
    onSnapshot(q, (snapshot) => {
      const dataCollection = snapshot.docs.map(doc => {
        return {
          [nameItem + "Id"]: doc.id,
          status: "UNCHANGED",
          ...doc.data()
        }

      })

      dispatch({ type: "LOAD", payload: { dataCollection: dataCollection, nameCollection: nameItem + "s" } })
    })
  }


  const snapQuery2 = async (q) => {
    return new Promise((resolve) => {
      onSnapshot(q, (snapshot) => {

        const dataCollection = snapshot.docs.map(doc => {

          return {
            purchaseId: doc.id,
            status: "UNCHANGED",
            ...doc.data()
          }

        })

        resolve(dataCollection)

      })
    })

  }
  const fetcData = async () => {
    const productsQuery = query(collection(db, "Products"));
    const customersQuery = query(collection(db, "Customers"));
    const purchasesQuery = query(collection(db, "Purchases"));
    await snapQuery(productsQuery, "product");
    await snapQuery(customersQuery, "customer");
    await snapQuery(purchasesQuery, "purchase");
    return purchasesQuery
  };


  useEffect(() => {

    fetcData();
  }, []);


  return (
    <>
      <Layout>
        <Routes>

          <Route path='/' element={<Products />}>
          </Route>
          <Route path='/EditProduct/:id' element={<EditProduct />} />
          <Route path='/EditCustomer/:id' element={<EditCustomer />} />
          <Route path='/AddProduct' element={<AddProduct />} />
          <Route path='/AddCustomer' element={<AddCustomer />} />
          <Route path='/Customers' element={<Customers />} />
          <Route path="/Purchases" element={<Purchases callback1={fetcData} callback2={snapQuery2} />} />

        </Routes>
      </Layout>


    </>
  )
}

export default App
