
 const initialState = {
     user: JSON.parse(localStorage.getItem("user")) || null,
     groups: []
}

export default function rootReducer (state = initialState, {payload, type}){
     switch(type){
         case "SET_USER":
               return {
                    ...state,
                    user: payload
               }
          case "SET_GROUPS":
               return{
                    ...state,
                    groups: payload
               }
     default: return state     
     }
}

