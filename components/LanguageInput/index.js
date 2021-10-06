import React from 'react'
import ReactLanguageSelect from 'react-languages-select';

const LanguageInput = ({ setSelectedLanguage, classNames }) => {
    return (
        <ReactLanguageSelect
            className={classNames}
            names={"international"}
            onSelect={(languageCode) => setSelectedLanguage(languageCode)}
        />
    )
}

export default LanguageInput;
