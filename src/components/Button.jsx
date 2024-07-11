import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-500",
    hoverBgColor = "hover:bg-blue-600",
    focusRingColor = "focus:ring-blue-500",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-full ${bgColor} ${hoverBgColor} ${focusRingColor} ${textColor} ${className} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200`}
            {...props}
        >
            {children}
        </button>
    );
}
