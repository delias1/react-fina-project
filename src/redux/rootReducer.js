import { v4 as uuidv4 } from 'uuid'
const initialState = {
    products: [],
    // {
    //     productId: uuidv4(),
    //     Name: "Vacuum Cleaner",
    //     Price: 2750,
    //     Quantity: 7
    // },
    // {
    //     productId: uuidv4(),
    //     Name: "PC",
    //     Price: 3652,
    //     Quantity: 10
    // },
    // {
    //     productId: uuidv4(),
    //     Name: "TV LG 75''",
    //     Price: 4800,
    //     Quantity: 13
    // }




    customers: [],
    purchases: []
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case "LOAD": {
            return { ...state, [action.payload.nameCollection]: action.payload.dataCollection }
        }

        case "ADD_PURCH": {
            return {
                ...state,
                purchases: [...state.purchases, { purchaseId: uuidv4(), ...action.payload }]
            }
        }

        case "DELETE_PURCH": {
            const purchases = state.purchases.filter(purch => purch.purchaseId !== action.payload)
            return {
                ...state, purchases: purchases

            }

        }

        case "UPDATE_PROD": {
            const products=[...state.products]
            const index = products.findIndex(prod => prod.productId === action.payload.productId)
            if (index !== -1) {
                products[index]=action.payload

            }

            return {...state, products:products}
        }


        default:
            return state;
    }
}



export default appReducer;