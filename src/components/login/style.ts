import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-wrapper {
    display: flex;
    flex-direction: column;
    input {
      border: none;
      border-radius: 8px;
      padding: 0.75rem;
      background-color: #ffffffaa;
      border: 1.5px solid #ffffffaa;
      &:focus {
        outline: none;
        border: 1.5px solid ${({ theme }) => theme.color.primary};
      }
    }

    .error {
      position: relative;
      animation: shake 0.1s linear;
      border: 1.5px solid ${({ theme }) => theme.color.error} !important;
      animation-iteration-count: 3;
    }

    @keyframes shake {
      0% {
        left: -5px;
      }
      100% {
        right: -5px;
      }
    }

    button {
      padding: 0.875rem;
      border: none;
      text-transform: uppercase;
      letter-spacing: 0.07rem;
      color: ${({ theme }) => theme.color.primary};

      &:hover {
        color: ${({ theme }) => theme.color.primary2};
      }
    }
  }
`;
