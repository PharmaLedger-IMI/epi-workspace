import RandomRoundRobinService from "./RandomRoundRobinService.js";
import CustomError from "../utils/CustomError.js";

const FETCH_THRESHOLD = 5;

const ERROR_TYPES = {
    "NO_DATA" : "no-data",
    "TIMEOUT" : "not-able-to-finish",
    "MISCONFIGURATION" : "misconfiguration"
}

export {
    ERROR_TYPES
}

export default function(smallTimeout, totalTimeout){
    this.fetchMeAResponse = function(urls, validateResponse) {
        let roundRobinService = new RandomRoundRobinService(urls);
        const fetchWithTimeout = async (nextRequest) => {
            const controller = new AbortController();

            return new Promise((resolve, reject) => {

                const cancelFetchTimeout = function(){
                    resolve();
                    controller.abort();
                }

                //if a request takes longer then smallTimeout we cancel it
                const timeoutId = setTimeout(cancelFetchTimeout, smallTimeout);

                //console.log("fetching", nextRequest);
                            fetch(nextRequest, {signal: controller.signal})
                                .then(async response => {
                                    clearTimeout(timeoutId);
                                    let validResponse;
                                    try{
                                        validResponse = await validateResponse(response);
                                    }catch (err){
                                        console.log("Caught an error during response validation", e);
                                        reject();
                                        return;
                                    }
                                    //console.log("validResponse", validResponse);
                                    if(validResponse){
                                        return resolve(response);
                                    }

                                    //if answer is not valid we need to continue, maybe we have other requests to do before time expire
                                    resolve();
                                }).catch(e => {
                                    //in case of a network fail or any other reason we resolve with undefined,
                                    // and maybe we have other requests to do before time expire
                                    resolve();
                                });
                            });
        };

        return new Promise(async (resolve, reject) => {
            let answer = null;
            let timeExpired = false;

            setTimeout(() => {
                timeExpired = true;
                if (!answer) {
                    reject(new CustomError(ERROR_TYPES.TIMEOUT));
                    return;
                }
            }, totalTimeout);

            let counter = 0;
           while(roundRobinService.count()){
               counter++;
               if(counter > FETCH_THRESHOLD){
                   return reject(new CustomError(ERROR_TYPES.MISCONFIGURATION));
               }
                answer = await fetchWithTimeout(roundRobinService.next().value);
                //console.log("answer", answer);
                if(answer || timeExpired){
                    break;
                }
            }

            if(!timeExpired){
                resolve(answer);
            }
        });
    }
}
