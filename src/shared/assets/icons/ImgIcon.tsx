export default (icon: string, width?: number | string, height?: number | string, style?: React.CSSProperties) => () => (
    <img
        src={icon}
        width={width}
        height={height}
        alt=""
        style={style}
    />
);
