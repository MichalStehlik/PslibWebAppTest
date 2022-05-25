import React from 'react'
import styled, { keyframes } from 'styled-components'

const motion = props => keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const DualRingSpinner = styled.div`
    display: inline-flex;
    width: ${p => `${p.size}em`};
    height: ${p => `${p.size}em`};
    align-items: center;
    justify-content: center;
    :after {
        content: ' ';
        display: block;
        width: ${props => `${props.size * 0.7}em`};
        height: ${props => `${props.size * 0.7}em`};
        margin: 1px;
        border-radius: 50%;
        border: ${props => `${props.size * 0.1}em`} solid ${p => p.color};
        border-color: ${props => props.color ? props.color : props.theme.text} transparent ${props => props.color ? props.color : props.theme.text} transparent;
        animation: ${props => motion(props)} 1.2s linear infinite;
    }
`

export const Spinner = ({ color, size }) => (
    <DualRingSpinner
        color={color}
        size={size}
    />
)

Spinner.defaultProps = {
    size: 1
}

export default Spinner