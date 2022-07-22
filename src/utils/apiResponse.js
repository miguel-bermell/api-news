exports.success = (message, data, status = 200) => ({
  success: true,
  message,
  data,
  status,
});

exports.failure = (message, status = 422) => ({
  success: false,
  message,
  status,
});
