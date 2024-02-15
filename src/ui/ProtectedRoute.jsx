import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
height: 100vh;
background-color: var(--color-grey-50);
display: flex;
align-items: center;
justify-content: center;
`;


function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //NOTE 1 - LOAD THE AUTHENTICATED USER
  const { isLoading, isAuthenticated, fetchStatus } = useUser();
  //NOTE 2- IF THER NO AUTHENTICATED USER, REDIRECT TO THE LOGIN PAGE
  useEffect(function () {
    if (!isAuthenticated && !isLoading && !fetchStatus) navigate('/login');
  }, [isAuthenticated, isLoading, navigate, fetchStatus]);

  //NOTE 3- WHILE LOADING SHOW A SPINNER
  if (isLoading) return <FullPage><Spinner /></FullPage>

  //NOTE 4- IF THERE IS A USER RENDER THE APP
  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}

export default ProtectedRoute
