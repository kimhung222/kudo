import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { realtimeDB } from '../../libs/firebase';
import { users } from '../../constants';
import { Kudo, User } from '../../type';

// components

export default function KudoTable() {
  const [kudos, setKudos] = useState({});
  useEffect(() => {
    const userRef = ref(realtimeDB, 'users');
    onValue(userRef, snapshot => {
      const kds = getKudos(snapshot.val() || {});
      setKudos(kds);
    });
  }, []);

  const getKudos = (users: User[]) => {
    let allKudos: Kudo[] = [];
    Object.keys(users).map((userId, index) => {
      const user = users[userId];
      const userKudos = user?.kudos || [];
      allKudos = [...allKudos, ...userKudos];
    });
    const grantee = {};
    if (allKudos) {
      allKudos.forEach(item => {
        const userId = item.userId;
        if (grantee[userId]) {
          grantee[userId] = [...grantee[userId], item.content];
        } else {
          grantee[userId] = [item.content];
        }
      });
    }
    return grantee;
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={'font-semibold text-lg '}>Kudos Info</h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    'p-1 align-middle border border-solid text-xs uppercase border-l-0 border-r-0' +
                    ' whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500' +
                    ' border-blueGray-100'
                  }
                >
                  Staff
                </th>
                <th
                  className={
                    'p1 align-middle border border-solid text-xs uppercase border-l-0' +
                    ' border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  }
                >
                  Content
                </th>
                <th
                  className={
                    'p1 align-middle border border-solid text-xs uppercase border-l-0' +
                    ' border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  }
                >
                  Count
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(kudos).map((id, index) => {
                const comments = kudos[id] || [];
                const user = users.find(i => i.id === Number(id)) || { name: '', userId: -1 };
                return (
                  <>
                    {comments.map((cmt, ids) => {
                      return (
                        <tr key={`dd-${ids}`}>
                          <th
                            className="max-w-40 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-1 text-left flex items-center truncate"
                            rowSpan={ids === 0 ? comments.length : 1}
                          >
                            <span className="font-bold text-blueGray-600 truncate">
                              {ids === 0 ? user.name : ''}
                            </span>
                          </th>
                          <td className="border-t-0 p-1 align-middle border-l-0 border-r-0 text-xs whitespace-pre-line">
                            {cmt}
                          </td>
                          <td className="max-w-40 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-1 text-left flex items-center truncate">
                            {ids === 0 ? comments.length : ''}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
