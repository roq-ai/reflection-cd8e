import axios from 'axios';
import queryString from 'query-string';
import { ReferenceInterface, ReferenceGetQueryInterface } from 'interfaces/reference';
import { GetQueryInterface } from '../../interfaces';

export const getReferences = async (query?: ReferenceGetQueryInterface) => {
  const response = await axios.get(`/api/references${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createReference = async (reference: ReferenceInterface) => {
  const response = await axios.post('/api/references', reference);
  return response.data;
};

export const updateReferenceById = async (id: string, reference: ReferenceInterface) => {
  const response = await axios.put(`/api/references/${id}`, reference);
  return response.data;
};

export const getReferenceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/references/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteReferenceById = async (id: string) => {
  const response = await axios.delete(`/api/references/${id}`);
  return response.data;
};
