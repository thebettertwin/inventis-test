import React, { ReactElement } from "react";
import clsx from "clsx";
/******
 * Button component
 * buttonText is a required prop for acceisibility,
 * for an icon only button we hide the text visually with
 * the visuallyHideLabel prop but keep it in the dom for
 * screen readers.
 *
 */

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
    buttonText: string;
    onClick: () => void;
    buttonImage?: ReactElement;
    buttonIcon?: ReactElement;
    visuallyHideLabel?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    buttonText,
    onClick,
    buttonImage,
    buttonIcon,
    visuallyHideLabel,
}) => {
    return (
        <button onClick={onClick} type="button" className="group flex bg-slate-100/80 hover:bg-slate-100 text-gray-700 px-6 font-bold rounded-2xl self-center items-center gap-1">
            <span>
                {buttonImage}
            </span>
            <span className={clsx(visuallyHideLabel ? "hidden" : "")}>
                {buttonText}
            </span>
            <span className="group-hover:translate-x-1 transition-all m-3">
                {buttonIcon}
            </span>
        </button>
    );
};

export default Button;