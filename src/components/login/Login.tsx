import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

import * as Styled from './style';
import { usePasscodeDispatch } from '../../context/code/CodeContext';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [login, setLogin] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const passwordRef = useRef();

  const dispatch = usePasscodeDispatch();

  // Change Input
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value);
  }

  function LoginProcess() {
    if (code === process.env.ENTRY_CODE) {
      dispatch({ type: 'LOGIN' });
      setLogin(true);
    } else {
      setIsError(true);
    }
  }

  // Button Click
  function handleButtonClicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    LoginProcess();
  }

  // Enter Key
  useEffect(() => {
    function handleKey({ key }: { key: any }) {
      if (key === 'Enter') {
        LoginProcess();
      }
    }
    window.addEventListener('keypress', handleKey);

    return () => {
      window.removeEventListener('keypress', handleKey);
    };
  }, [code]);

  // if Error, shake input
  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 500);
    }
  }, [isError]);

  return (
    <Styled.LoginContainer>
      {!login ? (
        <>
          <div className="login-wrapper">
            <input
              className={`${isError && 'error'}`}
              type="password"
              onChange={(e) => handleChangeInput(e)}
            />
            <button onClick={handleButtonClicked}>Login</button>
          </div>
        </>
      ) : (
        <Navigate to={'/'} />
      )}
    </Styled.LoginContainer>
  );
};

export default Login;
