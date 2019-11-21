import { useState } from 'react';

const useFizzBuzz = initial => {

    const [maxNum] = useState(initial);

    const isMultiple = (num, mod) => {
        return num % mod === 0;
    };

    const fizzBuzz = num => {
        switch (true) {
            case isMultiple(num, 15):
                return "FizzBuzz";
            case isMultiple(num, 3):
                return "Fizz";
            case isMultiple(num, 5):
                return "Buzz";
            default:
                return num;
        }
    };

    const fbArray = [...Array(maxNum)].map((_, i) => fizzBuzz(i + 1));

   return fbArray;
};

export default useFizzBuzz;