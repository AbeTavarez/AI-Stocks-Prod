import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button =  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className = "", children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={`${className} p-1 w-48 rounded`} {...props}>
      {children}
    </button>
  );
});

// ================

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'outline'
//   size?: 'sm' | 'md' | 'lg'
// }

// const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
//     const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'

//     const variantStyles = {
//       primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
//       secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
//       outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
//     }

//     const sizeStyles = {
//       sm: 'text-sm px-3 py-2',
//       md: 'text-base px-4 py-2',
//       lg: 'text-lg px-6 py-3',
//     }

//     const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

//     return (
//       <button
//         ref={ref}
//         className={combinedClassName}
//         {...props}
//       >
//         {children}
//       </button>
//     )
//   }
// )

// Button.displayName = 'Button'

// export { Button }
