"use client";

import { useEffect, useState } from 'react';
import { employeeApi } from '@/lib/api-handler';
import classes from './page.module.css';
// 경로 확인: components 폴더 안의 user 폴더 안의 파일
import UserAddModal from '@/components/user/user-add-modal'; 

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. 모달의 열림/닫힘 상태를 관리할 변수 추가
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await employeeApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (empNo) => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    if (confirm(`사번 [${empNo}] 직원을 퇴사 처리하시겠습니까?`)) {
      try {
        await employeeApi.delete(empNo, today);
        alert("퇴사 처리가 완료되었습니다.");
        fetchEmployees();
      } catch (err) {
        alert("처리에 실패했습니다: " + err.message);
      }
    }
  };

  if (isLoading) return <div className={classes.loading}>데이터 로딩 중...</div>;
  if (error) return <div className={classes.error}>에러 발생: {error}</div>;

  return (
    <div className={classes.container}>
      <div className={classes.titleSection}>
        <div className={classes.headerTop}>
          <h1 className={classes.title}>사용자 관리</h1>
          {/* 2. 버튼 클릭 시 setIsModalOpen(true)로 변경 */}
          <button className={classes.addBtn} onClick={() => setIsModalOpen(true)}>
            + 사원 등록
          </button>
        </div>
        <p className={classes.subTitle}>ONECORE HR 시스템의 전체 직원 목록입니다.</p>
      </div>

      <div className={classes.tableCard}>
        <table className={classes.userTable}>
          <thead>
            <tr>
              <th>상태</th>
              <th>사번</th>
              <th>성명</th>
              <th>부서</th>
              <th>직위</th>
              <th>파견지</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => {
                const lastAssign = user.assignments?.[0];
                const active = user.isActive;
                return (
                  <tr key={user.employeeNumber} className={!active ? classes.inactiveRow : ''}>
                    <td>
                      <span className={`${classes.statusBadge} ${active ? classes.active : classes.inactive}`}>
                        {active ? '재직' : '퇴사'}
                      </span>
                    </td>
                    <td className={classes.empNumber}>{user.employeeNumber}</td>
                    <td className={active ? classes.empName : classes.inactiveText}>{user.employeeName}</td>
                    <td>{lastAssign?.departmentName || '-'}</td>
                    <td>
                      <span className={classes.badge}>{lastAssign?.positionName || '미지정'}</span>
                    </td>
                    <td>{lastAssign?.projectSite || '-'}</td>
                    <td>
                      {active ? (
                        <button className={classes.actionBtn} onClick={() => handleDelete(user.employeeNumber)}>
                          퇴사
                        </button>
                      ) : (
                        <span className={classes.doneText}>처리완료</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className={classes.emptyRow}>등록된 직원이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. 모달 상태가 true일 때만 화면에 렌더링 */}
      {isModalOpen && (
        <UserAddModal 
          onClose={() => setIsModalOpen(false)} 
          onRefresh={fetchEmployees} 
        />
      )}
    </div>
  );
}