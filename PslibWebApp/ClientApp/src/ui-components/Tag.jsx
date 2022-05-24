export const Tag = ({ as, children, ...rest }) => {
    const Component = as;
    return (
        <Component {...rest}>{children}</Component>);
}

Tag.defaultProps = {
    as: "div"
}

export default Tag;