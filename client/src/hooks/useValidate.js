import { useState, useEffect } from 'react';

const useValidate = initials => {

    const [errors, setErrors] = useState({
        isValidInitials: false
    });

    useEffect(() => {
        const initialsRegEx = /^(?=[0-9a-zA-Z]{3}$).*/;
        const initialsMatch = initialsRegEx.test(initials);
        switch (initialsMatch) {
            case true:
                setErrors(errors => ({ ...errors, isValidInitials: true }));
                break;
            case false:
                setErrors(errors => ({ ...errors, isValidInitials: false }));
                break;
            default:
                setErrors(errors => ({ ...errors, isValidInitials: false }));
                break;
        };

    }, [initials]);

    const resetValidate = () => {
        setErrors({});
    };

    return [errors, resetValidate];
};

export default useValidate;