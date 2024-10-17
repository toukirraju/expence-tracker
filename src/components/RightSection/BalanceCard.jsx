import React from 'react'

const BalanceCard = ({
    title,
    amount,
    loan = false
}) => {
    return (
        <div className={`bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4`}>
            <dt className="text-base leading-7 text-gray-600">{title}</dt>
            <dd className={`order-first text-xl font-semibold tracking-tight sm:text-3xl ${loan ? "text-red-500" : "text-gray-700"}`}>BDT {amount}</dd>
        </div>
    )
}

export default BalanceCard
