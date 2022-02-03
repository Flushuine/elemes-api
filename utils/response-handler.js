const responseData = function (response, statusCode, values) {
    let data = {
        success: true,
        data: values,
    }
    response.status(statusCode).json(data)
    response.end()
}

const responseMessage = function (response, statusCode, message) {
    let data = {
        success: true,
        message: message,
    };
    response.status(statusCode).json(data)
    response.end()
}

export {responseData, responseMessage}