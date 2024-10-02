import axios from "axios";
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});
const createNewResume = (data) => axiosClient.post("/user-resumes", data);
const getUserResumes = (userEmail) =>
  axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail);

/**
 * Update a resume with the given id and data
 * @param {string} id The id of the resume to update
 * @param {object} data The data to update the resume with
 * @returns {Promise} The updated resume
 */
const updateResumeDetails = (id, data) =>
  axiosClient.put(`/user-resumes/${id}`, data);

const deleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`);
const getResumeById = (id) => axiosClient.get(`/user-resumes/${id}?populate=*`);
export default {
  createNewResume,
  getUserResumes,
  updateResumeDetails,
  getResumeById,
  deleteResumeById,
};
