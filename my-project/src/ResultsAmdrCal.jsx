import React from 'react';

const ResultsAmdrCal = ({ reportData }) => (
  <div className="bg-white rounded-lg shadow p-6 bg-opacity-90 border-2 border-[#F36234] m-4">
    <h2 className="text-3xl font-bold mb-6 text-center pt-4 pb-5 ">AMDR Results</h2>
    <div className="grid grid-cols-2 gap-4 text-lg ">
      <p><span className="font-bold">Protein Intake:</span> {reportData.protein_intake} g</p>
      <p><span className="font-bold">Carb Intake:</span> {reportData.carb_intake} g</p>
      <p><span className="font-bold">Lipid Intake:</span> {reportData.lipid_intake} g</p>
      <p><span className="font-bold">Calorie Intake:</span> {reportData.cal_intake} Kcal</p>
    </div>
  </div>
);

export default ResultsAmdrCal;
