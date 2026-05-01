import React, { useState, useEffect } from 'react';
import { getUsers, getUserPosts } from '../../../api/userManagement';
import UserPostModal from '../UserPostModal/UserPostModal';
import styles from './UserTable.module.css';

const UserTable = () => {
  const [searchCategory, setSearchCategory] = useState('ID');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await getUsers({ userId: 'all' });
    if (response.success) {
      setUsers(response.result || []);
    }
    setLoading(false);
  };

  const handleOpenPostModal = async (user) => {
    if (user.totalShare === 0) return;

    setSelectedUser(user);
    setIsModalOpen(true);
    setModalLoading(true);

    const response = await getUserPosts(user.userId);
    if (response.success) {
      setUserPosts(response.result);
    }
    setModalLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setUserPosts([]);
  };

  // 검색 필터링 로직
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    switch (searchCategory) {
      case '번호':
        return user.number.toString().includes(query);
      case 'ID':
        return user.userId.toLowerCase().includes(query);
      case '닉네임':
        return user.nickName.toLowerCase().includes(query);
      default:
        return true;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>전체 사용자 관리</h2>
        <div className={styles.controls}>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="번호">번호</option>
              <option value="ID">ID</option>
              <option value="닉네임">닉네임</option>
            </select>
            <span className={styles.selectArrow}>▼</span>
          </div>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>번호</th>
              <th style={{ width: '30%' }}>ID</th>
              <th style={{ width: '20%' }}>닉네임</th>
              <th style={{ width: '20%' }}>누적 경고</th>
              <th style={{ width: '20%' }}>작성 나눔글</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className={styles.noResult}>사용자 정보를 불러오는 중...</td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.number}</td>
                  <td style={{ color: '#000', fontWeight: '500' }}>{user.userId}</td>
                  <td>{user.nickName}</td>
                  <td>{user.totalWarming === '영구정지' ? '영구정지' : `${user.totalWarming}회`}</td>
                  <td>
                    <button 
                      className={`${styles.postBtn} ${user.totalShare === 0 ? styles.gray : styles.blue}`}
                      onClick={() => handleOpenPostModal(user)}
                    >
                      {user.totalShare === 0 ? '0개' : `${user.totalShare}개 보기`}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noResult}>검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 사용자 작성글 모달 */}
      <UserPostModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={selectedUser?.userId}
        nickName={selectedUser?.nickName}
        posts={userPosts}
        loading={modalLoading}
      />
    </div>
  );
};

export default UserTable;
