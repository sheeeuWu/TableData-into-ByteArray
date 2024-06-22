import React from 'react';
import SalesTable from '../component/SalesTable.js';

const Index = () => {
  return (
    <div>
      <h1 className='font-bold text-2xl text-center font-sans mt-5 mb-5'>Sales and Profit Data</h1>
      <SalesTable />
    </div>
  );
};

export default Index;