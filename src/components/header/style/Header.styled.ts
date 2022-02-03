import styled from 'styled-components'

export const Header = styled.nav`
    margin-top: 20px; 
    button {
        // background: none;
        // border: none;

        .button-component {
            display: flex;
            flex-direction: column;

            * {
                margin: auto;
            }

            span {
                margin-top: 8px;
                font-size: 10px;
            }
        }
    }
`