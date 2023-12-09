type Props = {
    text: string;
    className: string;
    extraText?: string;
    extraClassName?: string;
    onClick: () => void;
};

export const Button = ({
    text,
    className,
    extraText,
    extraClassName,
    onClick,
}: Props) => {
    return (
        <button className={className} onClick={onClick}>
            {text}{" "}
            {extraText && <span className={extraClassName}>{extraText}</span>}
        </button>
    );
};
