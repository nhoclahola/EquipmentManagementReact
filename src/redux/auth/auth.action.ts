import axios from "axios";
import { Dispatch } from "redux";
import { API_BASE_URL } from "../../config/api";
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./auth.actionType";

const login = async (loginData: any) => {
    console.log("loginData", loginData.data)
    const response = await axios.post(`${API_BASE_URL}/user-auth/login`, loginData.data);
    return response.data;
};

export const loginThunk = (loginData: any) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        try {
            const data = await login(loginData);
            localStorage.setItem("jwt", data);
            dispatch({ type: LOGIN_SUCCESS, payload: data });
        } 
        catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error });
            console.log("error", error);
        }
    };
};

export const getProfileAction = (jwt: string | null) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/user/from-token`, {
            headers: {
                "Authorization": `Beared ${jwt}`
            },
        });

        console.log("profile--", data);
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });

    }
    catch (error) {
        console.error(error);
        dispatch({ type: GET_PROFILE_FAILURE, payload: error });
    }
};