import { useState } from 'react';

const useForm = callback => {

    // values
    const [values, setValues] = useState({});

    // handle change
    const handleChange = ev => {
        ev.persist();
        const { name, value } = ev.target;
        setValues(values => ({ ...values, [name]: value }));
    };

    // handle submit
    const handleSubmit = ev => {
        if (ev) {
          ev.preventDefault();
        }
        callback();
      };

    // handle clear form
    const handleClearForm = () => {
        setValues({});
    };

    return {
      values, 
      handleChange, 
      handleSubmit, 
      handleClearForm
    };

};

export default useForm;