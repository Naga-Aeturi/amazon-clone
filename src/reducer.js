
export const initialState = {
    basket: [],
    user: null,
    total_products: [],
    filtered_products: []
};
  
export var getBasketTotal = function getBasketTotal(basket) {
    return basket.reduce(function (amount, item) {
      return item.price + amount;
    }, 0);
};
  
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                total_products: action.item
            };
        case "SET_FILTERED_PRODUCTS":
            return {
                ...state,
                filtered_products: action.item
            };
        case "ADD_TO_BASKET":
            return {
              ...state,
              basket: [...state.basket, action.item],
            };
        case "EMPTY_BASKET":
            return {
                ...state,
                basket:[]
            }
        case "REMOVE_FROM_BASKET":
           const index=state.basket.findIndex((item)=>item.id===action.id)
           let newBasket=[...state.basket];
           if(index>=0){
            newBasket.splice(index,1)
           }else{
            console.warn(`cant remove product (id:${action.id}`)
           }
           return {
            ...state,
            basket: newBasket
          }
        case "SET_USER":
           return {
              ...state,
              user: action.user
           }
      
        default:
            return state;
    }
};
  
export default reducer;