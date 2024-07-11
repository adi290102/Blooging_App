// yahi same input hum Login,sign up aur sign in me use karege.
// isleye label(jise ke madad se hum har input per use alag label de sake),type = "text",
// className = "",...props

/*Par hamara input component hai kahi aur uski state property hame chaiye kahi aur, isleye 
hume uska refrence lena padega jo ki hame forwardRef() hook se milta hai , jo hame input ka ref 
return karta hai.  */

import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label
                    className='inline-block mb-1 pl-1 text-gray-700'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-4 py-2 rounded-full bg-white text-black outline-none focus:bg-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 duration-200 border border-gray-300 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});
export default Input;
