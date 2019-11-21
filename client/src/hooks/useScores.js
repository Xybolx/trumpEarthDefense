import { useEffect } from 'react';
import API from '../utils/API';
import useArray from './useArray';

const useScores = search => {

    // state lives in the useArray custom hook
    const [scores, setScores] = useArray([]);
    const [results, setResults] = useArray([]);

    // get all scores on mount
    useEffect(() => {
        API.getScores()
            .then(res => setScores(res.data))
            .catch(err => console.log(err));
    }, [setScores]);

    // if search bar isn't empty setResults
    useEffect(() => {
        if (search) {
            setResults(scores.filter(score =>
                score.initials === search.toLowerCase() || score.score >= search));
                console.log("getting results");
        }
    }, [scores, search, setResults]);

    // return scores array and results array
    return [scores, results];
};

export default useScores;