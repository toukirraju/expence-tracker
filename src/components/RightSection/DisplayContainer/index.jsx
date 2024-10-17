

const DisplayContainer = ({
    children
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            {children}
        </div>
    )
}

export default DisplayContainer
