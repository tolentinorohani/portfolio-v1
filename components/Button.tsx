import Link from "next/link";
import { ComponentProps } from "react";

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  ...props
}: ButtonProps) {
  
  const baseStyles = "px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm inline-flex items-center justify-center text-center";

  const variants = {
    primary: "bg-violet-300 text-violet-950 hover:bg-violet-200",
    secondary: "",
    outline: "border-2 border-violet-300 text-violet-300 hover:bg-violet-300 hover:text-violet-950",
  }

  const combinedStyles = `${baseStyles} ${variants[variant]}  ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        { children }
      </Link>
    )
  }

  return (
    <button className={combinedStyles} {...props}>
        { children }
    </button>
  )
}