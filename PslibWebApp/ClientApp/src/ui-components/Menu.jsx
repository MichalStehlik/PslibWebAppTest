import styled from "styled-components"
import { Flex, Colors } from ".";

const StyledMenu = styled(Flex)`
    margin: 1px;
    background-color: ${() => Colors.darkBlue};
    border-radius: 4px;
    overflow: auto;
`;

export const Menu = (props) => (<StyledMenu as="nav" justifyContent="space-between" alignItems="center" {...props} />)

Menu.defaultProps = {
}

const StyledMenuBlock = styled(Flex)`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const MenuBlock = (props) => (<StyledMenuBlock as="ul" {...props} />)

const StyledMenuItem = styled.li`
    display: block;
    & > * {
        display: block;       
        font-size: 13px;
        font-weight: bold;
        padding: 1em;
    }
    & > a {
        text-decoration: none;
        color: white;
    }
    & > a:hover {
        text-decoration: none;
        color: white;
        background-color: ${() => Colors.defaultBlue};
    }
`;

export const MenuItem = (props) => (<StyledMenuItem {...props} />)

const StyledMenuLink = styled.li`

`;

export const MenuLink = (props) => (<StyledMenuLink {...props} />)

export default Menu;