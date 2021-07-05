const Button = ({ classNames, size, childrens, type, loading }) => {
    return (
        <button
            type={type}
            className={classNames}>
            {childrens}
            {loading &&
                <div className=" ml-3 animation:spin1s linear infinite rounded-full border-4 border-t-4 border-white-200 h-6 w-6 "></div>}

        </button>
    )
}

export default Button;