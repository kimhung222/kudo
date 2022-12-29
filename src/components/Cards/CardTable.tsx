import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { realtimeDB } from '../../libs/firebase';
import { users } from '../../constants';

// components

export default function CardTable() {
  const [data, setData] = useState({});
  useEffect(() => {
    const userRef = ref(realtimeDB, 'users');
    onValue(userRef, snapshot => {
      setData(snapshot.val() || {});
    });
  }, []);

  const getKudos = () => {
    let kudos = [];
    Object.keys(data).forEach((userId, i) => {
      const user = data[userId] || {};
      const kds = user.kudos || [];
      // @ts-ignore
      kudos = [...kudos, ...kds];
    });
    return kudos;
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={'font-semibold text-lg '}>Participants</h3>
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
                  User
                </th>
                <th
                  className={
                    'p1 align-middle border border-solid text-xs uppercase border-l-0' +
                    ' border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  }
                >
                  Assignee
                </th>
                <th
                  className={
                    'align-middle border border-solid p-1 text-xs uppercase border-l-0 border-r-0' +
                    ' whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  }
                >
                  Says
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((userId, index) => {
                const user = data[userId] || {};
                const kudos = user.kudos || [{ content: '', userId: '' }];
                return (
                  <>
                    {kudos.map((kudo, id) => {
                      const usr = users.find(u => u.id === kudo.userId) || {
                        name: ''
                      };
                      return (
                        <tr key={index}>
                          <th
                            className="max-w-30 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-1 text-left flex items-center truncate"
                            rowSpan={id === 0 ? kudos.length : 0}
                          >
                            <span className={'font-bold text-blueGray-600 truncate'}>
                              {id === 0 ? userId || 'user không xác định' : ''}
                            </span>
                          </th>
                          <td className="border-t-0 p-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                            {usr.name}
                          </td>
                          <td className="border-t-0 p-1 align-middle border-l-0 border-r-0 text-xs whitespace-pre-line">
                            {kudo.content}
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

CardTable.defaultProps = {
  color: 'light'
};
