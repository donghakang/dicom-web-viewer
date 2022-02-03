import styled from 'styled-components'

interface ProgressBarInterface {
    progress: number
}

export const ProgressBar = styled.div<ProgressBarInterface>`
    position: fixed;
    top: 0;

    width: ${props => props.progress + 'vw'};

    margin: 0;
    padding: 0;

    height: 4px;
    background: linear-gradient(90deg, #3fff7c, #3ffbe0);
    border-radius: 4px;
`

