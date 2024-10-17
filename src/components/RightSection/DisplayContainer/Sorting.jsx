import React from 'react'
import SortingSVG from '../../../assets/svg/Sorting'

const Sorting = ({ onChange }) => {
    const [toggle, setToggle] = React.useState(false)
    const [sortOn, setSortOn] = React.useState('')

    React.useEffect(() => {
        onChange && onChange(sortOn)
    }, [sortOn])
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button2"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setToggle(!toggle)}
                >
                    <SortingSVG />
                </button>
            </div>

            <div
                className={
                    `${toggle ? 'translate-x-0 opacity-1' : 'translate-x-64 opacity-0 invisible'} transition-all duration-300 ease-in-out transform ${toggle ? 'scale-100' : 'scale-95'
                    } absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`
                }
                role="menu2"
                aria-orientation="vertical"
                aria-labelledby="menu-button2"
                tabIndex="-1"
            >
                <div className="py-1" role="none">
                    <button
                        className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                        onClick={() => setSortOn('asc')}
                    >Low to High</button>
                    <button
                        className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                        onClick={() => setSortOn('desc')}
                    >High to Low</button>
                </div>
            </div>
        </div>
    )
}

export default Sorting
