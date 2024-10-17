import React from 'react'
import FilteringSVG from '../../../assets/svg/Filtering'
import CheckInput from '../../CheckInput'

const Filtering = ({
    data,
    onChange
}) => {
    const [toggle, setToggle] = React.useState(false)

    const [checkedItems, setCheckedItems] = React.useState([])

    const handleCheck = (e) => {
        const { name, checked } = e.target
        if (checked) {
            setCheckedItems([...checkedItems, name])
        } else {
            setCheckedItems(checkedItems.filter(item => item !== name))
        }
    }

    React.useEffect(() => {
        onChange && onChange(checkedItems)
    }, [checkedItems])


    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="filter-button-2"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setToggle(!toggle)}
                >
                    <FilteringSVG />
                </button>
            </div>

            <div
                className={
                    `${toggle ? 'translate-x-0 opacity-1' : 'translate-x-64 opacity-0 invisible'} transition-all duration-300 ease-in-out transform ${toggle ? 'scale-100' : 'scale-95'
                    } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`
                }
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="filter-button-2"
                tabIndex="-1"
                id="filter-dropdown2"
            >
                <div className="py-1" role="none">

                    {/* <CheckInput label="Education" /> */}
                    {
                        data?.map((category, index) => (
                            <CheckInput
                                key={index}
                                label={category.name}
                                name={category?.value}
                                onChange={handleCheck}
                                checked={checkedItems.includes(category.value)}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Filtering
