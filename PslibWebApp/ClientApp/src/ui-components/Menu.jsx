import styled from "styled-components"

const StyledMenu = styled.nav`
    margin: 1px;
    background-color: #0072bc;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Menu = (props) => (<StyledMenu {...props} />)

Menu.defaultProps = {
}

const StyledMenuBlock = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
`;

export const MenuBlock = (props) => (<StyledMenuBlock {...props} />)

const StyledMenuItem = styled.li`
    & > * {
        display: block;
        line-height: 46px;
        color: white;
        text-decoration: none;
        font-size: 13px;
        font-weight: bold;
    }
`;

export const MenuItem = (props) => (<StyledMenuItem {...props} />)

const StyledMenuLink = styled.li`

`;

export const MenuLink = (props) => (<StyledMenuLink {...props} />)

export default Menu;