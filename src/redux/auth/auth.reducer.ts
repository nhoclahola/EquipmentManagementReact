interface User {
    userId: number;
    fullName: string;
    gender: boolean; // true is male, false is female
    phoneNumber: string;
    role: string;
    username: string;
}

interface AuthState {
  jwt: string | null;
  loading: boolean;
  error: any | null;
  user: User | null;
}

const initialState: AuthState = {
  jwt: null,
  loading: false,
  error: null,
  user: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "GET_PROFILE_REQUEST":
      return { ...state, loading: true, error: null };
    case "GET_PROFILE_SUCCESS":
      return { ...state, user: action.payload, error: null, loading: false };
    case "LOGIN_SUCCESS":
      return { ...state, jwt: action.payload, loading: false, error: null };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};