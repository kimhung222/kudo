import React from 'react';
import { updateGame, writeDistributeStatus } from '../../libs/database';

export const GMGameCard = ({
  statSubtitle,
  statTitle,
  isPlaying,
  id,
  onStart,
  btnStartText = 'Start'
}) => {
  const onClick = () => {
    updateGame(isPlaying ? 0 : id);
    if (!isPlaying && onStart) {
      onStart();
    }
    if (isPlaying) {
      writeDistributeStatus(0);
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">{statSubtitle}</h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {statTitle}
                <span className="font-normal text-sm text-gray ml-1">users</span>
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12' +
                  ' shadow-lg rounded-full all:text-blue'
                }
              >
                <i className="fas fa-gamepad"></i>
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-400 mt-4">
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClick}
              style={{ background: isPlaying ? 'red' : '' }}
            >
              {isPlaying ? 'Finish' : btnStartText}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

GMGameCard.defaultProps = {
  statSubtitle: 'Game 1',
  statTitle: '1'
};
