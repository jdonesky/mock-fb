import React, { useState, useEffect } from "react";
import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {

      const [error,setError] = useState(null);

      useEffect(() => {
          const reqInterceptor = axios.interceptors.request.use(
              (req) => {
                  setError(null)
                  return req;
              },
              (error) => {
                  setError(error)
                  return Promise.reject(error);
              }
          );

          const resInterceptor = axios.interceptors.response.use(
              (res) => res,
              (error) => {
                  setError(error)
                  return Promise.reject(error);
              }
          );
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        }
      },[])

      const errorConfirmHandler = () => {
        setError(null);
      };

      let message;
      switch(error) {
          case 'INVALID_EMAIL':
              message = 'Please enter a valid email'
              break
          case 'INVALID_PASSWORD':
              message = 'Please enter a valid password'
              break;
          case 'EMAIL_NOT_FOUND':
              message = 'Please enter a valid password'
              break;
          default:
              message = 'TEST'
      }


      return (
        <React.Fragment>
          <Modal show={error} close={errorConfirmHandler} type="error">
            {error ? message : null}
          </Modal>
          <WrappedComponent {...props} />
        </React.Fragment>
      );
    }
};

export default withErrorHandler;
