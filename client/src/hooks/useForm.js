import { useState } from 'react';

const useForm = cb => {

    // state
    const [state, setState] = useState({});

    // handle change
    const handleChange = ev => {
        ev.persist();
        const { name, value } = ev.target;
        setState(state => ({ ...state, [name]: value }))
    };

    // handle submit
    const handleSubmit = ev => {
        if (ev) {
          ev.preventDefault();
        }
        cb();
      }

    // handle clear form
    const handleClearForm = () => {
        setState({});
    };

    return [state, handleChange, handleSubmit, handleClearForm];

}

export default useForm;