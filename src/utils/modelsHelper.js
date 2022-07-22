module.exports = (returnedObject) => {
  const { _id: mongoId } = returnedObject;
  const object = {
    ...returnedObject,
    id: mongoId,
  };
  const { _id, __v, ...objectSanitized } = object;
  return objectSanitized;
};
