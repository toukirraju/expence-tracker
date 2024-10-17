import React from 'react'

const Header = ({
    title,
    icon,
    children,
    className = ''
}) => {
    return (
        <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
            <div className="flex items-center gap-2">
                {/* <!-- Icon --> */}
                <div
                    className={`h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base ${className}`}
                >
                    {icon}
                </div>
                {/* <!-- Text --> */}
                <div>
                    <h3 className="text-xl font-semibold leading-7 text-gray-800">{title}</h3>
                </div>
            </div>

            {/* <!-- Sorting and Filtering Column --> */}
            <div className='flex gap-2'>
                {children}
            </div>
            {/* <!-- Sorting and Filtering Column Ends --> */}
        </div>
    )
}

export default Header
