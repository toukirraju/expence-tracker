import React from 'react'
import BalanceCard from './BalanceCard'


const BalanceStatus = ({ data }) => {
    const { expences = [], incomes = [] } = data || {}

    const [expense, setExpense] = React.useState(0)
    const [income, setIncome] = React.useState(0)
    const [balance, setBalance] = React.useState(0)

    React.useEffect(() => {
        //calculate total amount of income
        const totalIncome = incomes.reduce((acc, cur) => parseInt(acc) + parseInt(cur.amount), 0)
        //calculate total amount of expense
        const totalExpense = expences.reduce((acc, cur) => parseInt(acc) + parseInt(cur.amount), 0)
        //calculate balance
        const balance = totalIncome - totalExpense

        setIncome(totalIncome)
        setExpense(totalExpense)
        setBalance(balance)
    }, [expences, incomes])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl">
                <dl className="grid grid-cols-1 text-center lg:grid-cols-3 divide-x-2 border rounded-md overflow-hidden">
                    <BalanceCard title="Balance" amount={balance} loan={
                        balance < 0 ? true : false
                    } />
                    <BalanceCard title="Total Income" amount={income} />
                    <BalanceCard title="Total Expense" amount={expense} />
                </dl>
            </div>
        </div>
    )
}

export default BalanceStatus
