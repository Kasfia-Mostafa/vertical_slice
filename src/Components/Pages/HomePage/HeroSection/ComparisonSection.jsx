/* eslint-disable no-unused-vars */
import { motion } from "motion/react";

/**
 * ComparisonSection Component
 *
 * Modal component for side-by-side comparison of selected universities.
 * Displays key metrics (GPA, IELTS, tuition) in a tabular format.
 *
 * @param {Object} props - Component props
 * @param {Array} props.selectedUnis - Array of university objects to compare (max 3)
 * @param {Function} props.onClose - Callback function to close the modal
 */
const ComparisonSection = ({ selectedUnis, onClose }) => {
  return (
    // Full-screen overlay with dark backdrop and blur effect
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-200 flex items-center justify-center p-4">
      {/* Modal container with entrance animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl"
      >
        {/* ========================================
            MODAL HEADER - Title and close button
            ======================================== */}
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <div>
            {/* Modal title */}
            <h2 className="text-2xl font-black text-slate-800">University Comparison</h2>
            {/* Dynamic count of universities being compared */}
            <p className="text-sm text-slate-500">Comparing {selectedUnis.length} institutions</p>
          </div>
          {/* Close button - triggers onClose callback */}
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            ✕
          </button>
        </div>

        {/* ========================================
            COMPARISON TABLE - Side-by-side metrics
            ======================================== */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white">
                {/* First column header for feature names */}
                <th className="p-6 text-slate-400 uppercase text-xs tracking-widest border-b">Feature</th>
                {/* Dynamic columns for each selected university */}
                {selectedUnis.map(uni => (
                  <th key={uni.id} className="p-6 border-b border-l min-w-62.5">
                    {/* University name */}
                    <p className="text-huntergreen font-bold text-lg">{uni.name}</p>
                    {/* University location */}
                    <p className="text-xs text-slate-400">{uni.country}</p>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body with metric rows */}
            <tbody className="divide-y divide-slate-100">
              {/* GPA Requirements Row */}
              <tr>
                <td className="p-6 font-bold text-slate-700 bg-slate-50/50">GPA Requirement</td>
                {/* Display minimum GPA for each university */}
                {selectedUnis.map(uni => (
                  <td key={uni.id} className="p-6 border-l text-center font-mono text-lg">{uni.min_gpa}</td>
                ))}
              </tr>
              {/* IELTS Requirements Row */}
              <tr>
                <td className="p-6 font-bold text-slate-700 bg-slate-50/50">IELTS Requirement</td>
                {/* Display minimum IELTS score for each university */}
                {selectedUnis.map(uni => (
                  <td key={uni.id} className="p-6 border-l text-center font-mono text-lg">{uni.min_ielts}</td>
                ))}
              </tr>
              {/* Annual Tuition Row */}
              <tr>
                <td className="p-6 font-bold text-slate-700 bg-slate-50/50">Annual Tuition</td>
                {/* Display tuition fees with badge styling */}
                {selectedUnis.map(uni => (
                  <td key={uni.id} className="p-6 border-l text-center">
                    {/* Formatted tuition amount with badge background */}
                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-bold">
                      ${uni.tuition.toLocaleString()}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========================================
            MODAL FOOTER - Close action
            ======================================== */}
        <div className="p-6 bg-slate-50 text-center border-t">
          {/* Close button - triggers onClose callback to dismiss modal */}
          <button
            onClick={onClose}
            className="px-8 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all"
          >
            Close Comparison
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default ComparisonSection;
