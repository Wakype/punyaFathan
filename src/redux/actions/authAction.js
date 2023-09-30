import Cookies from 'js-cookie';
import {

  forgotPassword,
    login, registerProses, resetPassword, authMeProcess
} from '../../Api/auth';

export function authLogin(payload) {
  return async (dispatch) => {
    try {
      let response = await login(payload);
      let data = response.data;
      console.log('data 1 =>', data);
      dispatch({
        type: 'login',
        email: data?.user?.email,
        password: data?.user?.password,
        isAuth: true,
      });
      Cookies.set('myapps_token', data?.token);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}


export function authMe(payload) {
  return async (dispatch) => {
    try {
      let response = await authMeProcess();
      let data = response.data;
      console.log("authme =>",data)
      dispatch({
        type: 'login',
        email: data?.user?.email,
        password: data?.user?.password,
        isAuth: true,
      });
      Cookies.set('myapps_token', data?.token);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}
// export function authMe(payload) {
//   return async (dispatch) => {
//     try {
//       let response = await authMeProcess();
//       let data = response.data;
//       console.log("authme =>",data)
//       dispatch({
//         type: 'login',
//         email: data?.user?.email,
//         password: data?.user?.password,
//         isAuth: true,
//       });
//       Cookies.set('myapps_token', data?.token);
//       return data;
//     } catch (err) {
//       console.log(err);
//       return err;
//     }
//   };
// }


export function authRegister(payload) {
  return async (dispatch) => {
    try {
      let response = await registerProses(payload);
      let data = response.data;
      console.log('data =>', data);
      dispatch({
        peature:data?.user?.peature,
        name: data?.user?.name,
        email: data?.user?.email,
        password: data?.user?.password,
        role: data?.user?.role
       
      });
      Cookies.set('myapps_token', data?.token);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export function authForgot(payload) {
  return async (dispatch) => {
    try {
      let response = await forgotPassword(payload);
      let data = response.data;
      console.log('data =>', data);
      dispatch({
        type: 'login',
        email: data?.user?.email,
        isAuth: true,
      });
      Cookies.set('myapps_token', data?.token);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export function authReset(id,token,payload) {
  return async (dispatch) => {
    try {
      let response = await resetPassword(id,token,payload);
      let data = response.data;
      console.log('data =>', data);
      dispatch({
        type: 'login',
        password : data?.user?.password,
        passwordConfirmation: data?.user?.passwordConfirmation,
        isAuth: true,
      });
      Cookies.set('myapps_token', data?.token);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}