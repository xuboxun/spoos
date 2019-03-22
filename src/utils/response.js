function response(code, msg, result) {
    return {
        code: code,
        msg: msg,
        result: result
    };
}

module.exports = response;
