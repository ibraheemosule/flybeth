import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
    const baseClass = 'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2';
    const variantClass = variant === 'primary'
        ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500';
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
    return (_jsx("button", { className: `${baseClass} ${variantClass} ${disabledClass}`, onClick: onClick, disabled: disabled, children: children }));
};
export default Button;
