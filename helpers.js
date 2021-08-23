export const getInputClasses = (formik, fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
        return "border-red-500";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
        return "border-blue-500";
    }

    return "";
};


export const movetoNext = (e, nextFieldId) => {
    const { value, maxLength } = e.target;
    if (value.length >= maxLength) {
        document.getElementById(nextFieldId).focus();
    }
}