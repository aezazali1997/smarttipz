const Button = ({ classNames, size, childrens, type, loading }) => {
    return (
        <button
            type={type}
            className={classNames}>
            {childrens}
            {loading &&
                <div className=" ml-3 loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></div>}
        </button>
    )
}

export default Button;