import React from 'react'
import ReactLanguageSelect from 'react-languages-select';

const LanguageInput = ({ handleChange, classNames }) => {
    return (
        <ReactLanguageSelect
            className={classNames}
            searchable={true}
            defaultLanguage={''}
            searchPlaceholder="Search for a language"
            names={"both"}
            onSelect={e => handleChange(e)}
        />
    )
}

export default LanguageInput;
