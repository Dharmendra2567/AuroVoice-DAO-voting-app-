import React from 'react';

const ProposalCountDisplay = ({ count }) => {
  return (
    <button className="bg-purple-200  rounded-lg shadow p-2 ">
      <h2 className="text-xl font-semibold text-white-800">Total Proposals: {count}</h2>
    </button>
  );
};

export default ProposalCountDisplay;