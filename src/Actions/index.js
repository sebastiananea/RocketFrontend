export const SAVEDATA = "SAVEDATA"

export function setUser(data) {
  return {
    type: "SET_USER",
    payload: data,
  };
}

export function setGroups(data){
    return{
        type:"SET_GROUPS",
        payload:data
    }
}

export function saveData(data){
  return{
    type:SAVEDATA,
    payload: data
  }
}







