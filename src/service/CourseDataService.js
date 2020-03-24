import axios from 'axios';

class CourseDataService {
    retrieveAllCourse() {
        return axios.get('http://localhost:8080/api/tutorials');
    }
    createCourse(data) {
        return axios.post('http://localhost:8080/api/tutorials', data);
    }
    deleteCourse(id) {
        return axios.delete(`http://localhost:8080/api/tutorials/${id}`);
    }
    updateCourse(id, data) {
        return axios.put(`http://localhost:8080/api/tutorials/${id}`, data);
    }
}

export default new CourseDataService();