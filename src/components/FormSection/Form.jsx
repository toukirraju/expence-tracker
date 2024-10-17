import React from 'react'
import { expenseCategories, incomCategories } from '../../data'

const Form = ({
    setState,
    state,
    formData,
    setFormData
}) => {
    const [expense, setExpense] = React.useState(false)


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.status === 'edit') {
            const { id, type } = formData
            const newIncomes = state.incomes.map((income) => {
                if (income.id === id) {
                    return { ...formData, type, id }
                }
                return income
            })
            const newExpences = state.expences.map((expence) => {
                if (expence.id === id) {
                    return { ...formData, type, id }
                }
                return expence
            })
            setState((prev) => {
                return {
                    ...prev,
                    incomes: newIncomes,
                    expences: newExpences
                }
            })
            setFormData({
                status: 'add',
                type: '',
                category: '',
                amount: '',
                date: ''
            })
        } else {
            //if expense is true, then type is expense, else type is income
            const type = expense ? 'expense' : 'income'
            setState((prev) => {
                return {
                    ...prev,
                    formData: { ...formData, type, id: crypto.randomUUID() },
                    incomes: type === 'income' ? [...prev.incomes, { ...formData, type, id: crypto.randomUUID() }] : [...state.incomes],
                    expences: type === 'expense' ? [...prev.expences, { ...formData, type, id: crypto.randomUUID() }] : [...state.expences]
                }
            })

            //reset the form
            setFormData({
                status: 'add',
                type: '',
                category: '',
                amount: '',
                date: ''
            })
        }

    }

    //if fromData.status is edit, then check type is expense or income and set the expense state accordingly
    React.useEffect(() => {
        if (formData.status === 'edit') {
            setExpense(formData.type === 'expense')
        }
    }, [formData])
    return (
        <form onSubmit={handleSubmit}>
            <div
                className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6"
            >
                <div onClick={() => setExpense(false)} className={`cursor-pointer text-center flex-1 px-4 py-2 ${!expense ? 'active' : ''
                    }`}>
                    Income
                </div>
                <div onClick={() => setExpense(true)} className={`cursor-pointer text-center flex-1 px-4 py-2 ${expense ? 'active' : ''
                    }`}>
                    Expense
                </div>
            </div>

            {/* <!-- Note --> */}
            {/* <!-- Income Categories - Salary, Outsourcing, Bond, Dividend --> */}
            <div className="mt-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                <div className="mt-2">
                    <select
                        id="category"
                        name="category"
                        autoComplete="category-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={formData.category || ''}
                        required
                    >
                        <option value="" >Select Category</option>
                        {expense ? expenseCategories.map((category, index) => (
                            <option key={index} value={category.value}>{category.name}</option>
                        )) : incomCategories.map((category, idx) => (
                            <option key={idx} value={category.value}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-3">
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
                <div className="mt-2">
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        autoComplete="off"
                        placeholder="12931"
                        onChange={handleChange}
                        value={formData.amount || ''}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="mt-3">
                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                <div className="mt-2">
                    <input
                        type="date"
                        name="date"
                        id="date"
                        autoComplete="off"
                        placeholder="12931"
                        onChange={handleChange}
                        value={formData.date || ''}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
            >
                {
                    formData.status === 'edit' ? 'Update' : 'Save'
                }
            </button>
        </form>
    )
}

export default Form
