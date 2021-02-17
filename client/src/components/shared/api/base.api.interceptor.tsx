import { notification } from '@library/notification';
import { Error } from '@library/error';
import { error as errorModal } from '@library/modal';

const disableInterceptor = (config: any = {}) => {
    return config.disableInterceptor ? true : false;
};

export const requestHandler = (request: any) => {
    if (!disableInterceptor(request)) {
        // Modify request here
        // request.headers['X-CodePen'] =
        //     'https://codepen.io/teroauralinna/full/vPvKWe';
    }
    return request;
};

export const errorHandler = (error: any) => {
    if (!disableInterceptor(error.config)) {
        const url = formatApiUrl(error.config.url);
        // Handle errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            const errorDetails = error.response.data;
            if (errorDetails.errors) {
                errorModal({
                    title: 'Validation Failed',
                    content: <Error {...errorDetails} />,
                });
            } else {
                notification.error({
                    message: `Something went wrong ${url}`,
                    description:
                        errorDetails && errorDetails.message
                            ? errorDetails.message
                            : error.response.statusText,
                });
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request);
            notification.error({
                message: `Network Error${url}`,
                description: 'ERR_CONNECTION_REFUSED',
            });
        } else {
            // Something happened in setting up the request that triggered an Error
            notification.error({
                message: `Request Error${url}`,
                description: error ? error.message : '',
            });
        }
        console.error({ ...error });
    }
    return Promise.reject({ ...error });
};

export const successHandler = (response: any) => {
    if (!disableInterceptor(response.config)) {
        // Handle responses
    }
    return response;
};

const formatApiUrl = (apiUrl: string) => {
    if (!apiUrl) {
        return apiUrl;
    }
    return (
        ` for api ` +
        apiUrl
            .toLowerCase()
            .split('/')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' ')
    );
};
