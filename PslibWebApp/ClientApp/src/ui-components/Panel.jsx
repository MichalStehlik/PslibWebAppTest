import styled from "styled-components"

const StyledPanel = styled.div`
    background-color: ${props => props.bg ? props.bg : props.theme.colors.panel};
    border-radius: ${props => props.borderRadius};
    border: ${props => props.border};
    padding: ${props => props.p};
`;

export const Panel = (props) => (<StyledPanel {...props} />)

Panel.defaultProps = {
    borderRadius: "4px",
    border: 0,
    p: "1em"
}

export default Panel;