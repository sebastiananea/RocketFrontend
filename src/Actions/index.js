const USER_CHANGES = "USER_CHANGES";
const GET_PROFILES = "GET_PROFILES";
const IS_LOG = "IS_LOG";
const ASIGN_TABLE = "ASIGN_TABLE";
const SEARCH_USER = "SEARCH_USER";
const SEARCH_USER_ID="SEARCH_USER_ID";

export function setUser(data){
    return {
        type:"SET_USER",
        payload:data}
}
export function setGroups(data){
    return{
        type:"SET_GROUPS",
        payload:data
    }
}




