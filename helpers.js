export const getInputClasses = (formik, fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
        return "border-red-500";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
        return "border-blue-500";
    }

    return "";
};


export const movetoNext = (e, nextFieldId, prevFieldId) => {
    const { value, maxLength } = e.target;
    if ((e.keyCode === 37 || e.keyCode === 39) && value.length >= maxLength) {
    }

    else if (e.keyCode === 8) {
        if (prevFieldId !== null) {
            document.getElementById(prevFieldId).focus();
        }
    }

    else if ((e.keyCode !== 37 || e.keyCode !== 39) && value.length >= maxLength) {
        document.getElementById(nextFieldId).focus();
    }
}

export const scrollToBottom = (messagesEndRef) => {
    messagesEndRef.current?.scrollIntoView()
}
