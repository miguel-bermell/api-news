exports.success = (message, data, status = 200) => {
  return {
    success: true,
    message,
    data,
    status
  }
}

exports.failure = (message, status = 422) => {
  return {
    success: false,
    message,
    status
  }
}
