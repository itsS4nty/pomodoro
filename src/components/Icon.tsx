type IconProps = {
    url: string;
};

const Icon = (props: IconProps) => {
    return <img src={props.url} alt='Icon' />;
};

export default Icon;
