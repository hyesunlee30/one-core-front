// lib/api-handler.js
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const employeeApi = {
  // 1. 사원 목록 조회
  getAll: async () => {
    const { data } = await client.get('/employees');
    return data;
  },

  // 2. 사원 상세 조회
  getById: async (employeeNumber) => {
    const { data } = await client.get(`/employees/${employeeNumber}`);
    return data;
  },

  // 3. 사원 추가
  create: async (employeeRequest) => {
    const { data } = await client.post('/employees', employeeRequest);
    return data;
  },

  // 4. 사원 삭제 (퇴사 처리)
  delete: async (employeeNumber, endDate) => {
    // API 명세가 /{employeeNumber}/{endDate} 형태이므로 템플릿 리터럴 사용
    const { data } = await client.delete(`/employees/${employeeNumber}/${endDate}`);
    return data;
  }
};

export default client;