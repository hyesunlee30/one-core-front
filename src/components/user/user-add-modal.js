"use client";

import { useState } from 'react';
import { employeeApi } from '@/lib/api-handler';
import styles from './user-add-modal.module.css';

export default function UserAddModal({ onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    name: '',
    departmentCode: '',
    email: '',
    positionCode: '',
    siteCode: '',
    hireDate: '',
    salary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'salary' ? value.replace(/[^0-9]/g, '') : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      hireDate: formData.hireDate.replace(/-/g, ''),
      salary: Number(formData.salary) || 0
    };

    try {
      await employeeApi.create(requestData);
      alert("등록되었습니다.");
      onRefresh();
      onClose();
    } catch (err) {
      alert("에러: " + err.message);
    }
  };

  return (
    <div 
      className={styles.overlay} 
      // 클릭(Click) 대신 마우스를 누르는 순간(MouseDown)에만 닫기 체크
      onMouseDown={onClose} 
    >
      <div 
        className={styles.modal} 
        // 모달 안쪽을 누르거나 드래그할 때는 밖으로 이벤트가 나가지 않게 차단
        onMouseDown={(e) => e.stopPropagation()} 
      >
        <h2 className={styles.title}>신규 사원 등록</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            {/* ... 기존 입력 필드들 ... */}
            <div className={styles.field}>
              <label>성명</label>
              <input name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>이메일</label>
              <input name="email" type="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>부서 코드</label>
              <input name="departmentCode" required value={formData.departmentCode} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>직위 코드</label>
              <input name="positionCode" required value={formData.positionCode} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>파견지 코드</label>
              <input name="siteCode" required value={formData.siteCode} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>입사일</label>
              <input name="hireDate" type="date" required value={formData.hireDate} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>연봉</label>
              <input name="salary" type="text" placeholder="숫자만 입력" required value={formData.salary} onChange={handleChange} />
            </div>
          </div>
          
          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>취소</button>
            <button type="submit" className={styles.submitBtn}>등록하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}