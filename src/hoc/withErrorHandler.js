import React, { useState, useEffect } from "react";
import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {

      const [error,setError] = useState(null);

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

      useEffect(() => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      },[])

      const errorConfirmHandler = () => {
        setError(null);
      };

      return (
        <React.Fragment>
          <Modal show={error} close={errorConfirmHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </React.Fragment>
      );
    }
};

export default withErrorHandler;
