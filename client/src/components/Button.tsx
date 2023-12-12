type Props = {
    text: string;
    className: string;
    extraText?: string;
    extraClassName?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
};

export const Button = ({
    text,
    className,
    extraText,
    extraClassName,
    type,
    onClick,
}: Props) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {text}{" "}
            {extraText && <span className={extraClassName}>{extraText}</span>}
        </button>
    );
};
