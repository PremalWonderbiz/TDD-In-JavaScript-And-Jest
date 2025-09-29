
export function dictionary(words) {
    const result = {};
    
    if(words) {
        let wordsArray = splitString(words);
        for(let word of wordsArray) {
            if(result[word]) {
                result[word] += 1;
            }else {
                result[word] = 1;
            }
        }    
    }
    return result;
}

function splitString(string) {
    return string.match(/[^ ]+/g);
}