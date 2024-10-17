import React from 'react'
import FormSection from '../components/FormSection'
import Form from '../components/FormSection/Form'
import RightSection from '../components/RightSection'
import BalanceStatus from '../components/RightSection/BalanceStatus'
import DisplayContainer from '../components/RightSection/DisplayContainer'
import Income from '../components/RightSection/DisplayContainer/Income'
import Header from '../components/RightSection/DisplayContainer/Header'
import Sorting from '../components/RightSection/DisplayContainer/Sorting'
import IncomeSVG from '../assets/svg/Income'
import Filtering from '../components/RightSection/DisplayContainer/Filtering'
import ListItem from '../components/RightSection/DisplayContainer/ListItem'
import Expense from '../components/RightSection/DisplayContainer/Expense'
import ExpenceSVG from '../assets/svg/Expence'
import { expenseCategories, incomCategories } from '../data'

const MainLayout = () => {
    const [state, setState] = React.useState({
        formData: {},
        incomes: [],
        expences: [],
    })

    const [formData, setFormData] = React.useState({
        status: 'add',
        type: '',
        category: '',
        amount: '',
        date: ''
    })

    const [checkedIncomeCategories, setCheckedIncomeCategories] = React.useState([])
    const [checkedExpenseCategories, setCheckedExpenseCategories] = React.useState([])

    const [incomeSortOn, setIncomeSortOn] = React.useState('')
    const [expenseSortOn, setExpenseSortOn] = React.useState('')
    // console.log(state, 'state')

    console.log(checkedExpenseCategories, 'checkedExpenseCategories')
    console.log(checkedIncomeCategories, 'checkedIncomeCategories')


    const handleClick = (data, type) => {
        console.log(data, type)
        // type is delete and data.type is income then remove from income
        if (type === 'delete' && data.type === 'income') {
            const newIncome = state.incomes.filter((item) => item.id !== data.id)
            setState((prev) => {
                return {
                    ...prev,
                    incomes: newIncome
                }
            })
        }
        // type is delete and data.type is expense then remove from expense
        if (type === 'delete' && data.type === 'expense') {
            const newExpense = state.expences.filter((item) => item.id !== data.id)
            setState((prev) => {
                return {
                    ...prev,
                    expences: newExpense
                }
            })
        }

        // type is edit set the form data
        if (type === 'edit') {
            setFormData({
                ...data,
                status: 'edit'
            })
        }

    }



    const filterdIncome = state.incomes
        .filter((item) => {
            if (checkedIncomeCategories.length > 0) {
                return checkedIncomeCategories.includes(item.category)
            }
            return item
        })
        .sort((a, b) => {
            if (incomeSortOn === 'asc') {
                return a.amount - b.amount
            } else if (incomeSortOn === 'desc') {
                return b.amount - a.amount
            }
            return 0
        })

    const filterdExpense = state.expences
        .filter((item) => {
            if (checkedExpenseCategories.length > 0) {
                return checkedExpenseCategories.includes(item.category)
            }
            return item
        })
        .sort((a, b) => {
            if (expenseSortOn === 'asc') {
                return a.amount - b.amount
            } else if (expenseSortOn === 'desc') {
                return b.amount - a.amount
            }
            return 0
        })


    return (
        <main className="relative mx-auto mt-10 w-full max-w-7xl ">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* <!-- Submission Form --> */}
                <FormSection>
                    <Form setState={setState} state={state} formData={formData} setFormData={setFormData} />
                </FormSection>
                {/* <!-- Right Column --> */}
                <RightSection>
                    {/* <!-- Total Balance Stat--> */}
                    <BalanceStatus data={state} />

                    {/* <!-- List Down --> */}
                    <DisplayContainer>
                        {/* <!-- Income --> */}
                        <Income>
                            {/* <!-- Header --> */}
                            <Header
                                title={'Income'}
                                icon={<IncomeSVG />}
                                className='!bg-teal-600 !text-white'
                            >
                                {/* <!-- Sorting --> */}
                                <Sorting onChange={setIncomeSortOn} />

                                {/* <!-- Filtering --> */}
                                <Filtering data={incomCategories} onChange={setCheckedIncomeCategories} />
                            </Header>

                            <div className="p-4 divide-y">
                                {/* <!-- Income Row  --> */}
                                {
                                    filterdIncome?.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            item={item}
                                            onClick={handleClick}
                                        />
                                    ))
                                }

                            </div>
                        </Income>
                        {/* <!-- Expense --> */}
                        <Expense>
                            {/* <!-- Header --> */}
                            <Header
                                title={'Expence'}
                                icon={<ExpenceSVG />}
                            >
                                {/* <!-- Sorting --> */}
                                <Sorting onChange={setExpenseSortOn} />

                                {/* <!-- Filtering --> */}
                                <Filtering data={expenseCategories} onChange={setCheckedExpenseCategories} />
                            </Header>

                            <div className="p-4 divide-y">
                                {/* <!-- Income Row  --> */}
                                {
                                    filterdExpense?.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            item={item}
                                            onClick={handleClick}
                                        />
                                    ))
                                }

                            </div>
                        </Expense>
                    </DisplayContainer>
                </RightSection>
            </section>
        </main>
    )
}

export default MainLayout
