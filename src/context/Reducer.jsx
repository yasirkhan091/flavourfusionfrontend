const initialState={
    userID:null,
    LoggedIn:false,
    LoggingIn:true
}

const reducer=(state, { type, payload }) => {
  switch (type) {
  case "LogIn":
    return { userID: payload.userID , LoggedIn: true, LoggingIn:false };
  case "LogInFailed":
    return {...initialState, LoggingIn:false};
  case "LogOut":
    return {...initialState, LoggingIn:false};
  default:
    return state;
  }
}

export {initialState, reducer};