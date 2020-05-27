import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((persons) => persons.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((persons) => persons.data);
};

const update = (newObject, id) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((persons) => persons.data);
};

const deletedItem = (id) => axios
  .delete(`${baseUrl}/${id}`)
  .catch(() => alert("Couldn't delete requested user."));

export default {
  getAll, create, update, deletedItem,
};
