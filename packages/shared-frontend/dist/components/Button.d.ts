import React from 'react';
export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}
export declare const Button: React.FC<ButtonProps>;
export default Button;
