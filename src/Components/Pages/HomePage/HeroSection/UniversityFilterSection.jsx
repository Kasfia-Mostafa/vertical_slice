/* eslint-disable no-unused-vars */
import { useLoaderData, useSubmit, Form } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ComparisonSection from "./ComparisonSection";
import toast, { Toaster } from "react-hot-toast";
import { Globe, GraduationCap } from "lucide-react";

/**
 * UniversityFilterSection Component
 *
 * Main landing page component that allows students to:
 * - Browse and filter universities by country, degree level, and tuition
 * - Check eligibility based on their GPA and IELTS scores
 * - Apply to eligible universities through a two-step modal process
 * - Compare up to 3 universities side-by-side
 *
 * Features:
 * - Real-time filtering with React Router forms
 * - Eligibility validation based on minimum requirements
 * - Animated UI with Framer Motion
 * - Toast notifications for user feedback
 */
const UniversityFilterSection = () => {
  // ============================================
  // DATA FETCHING & ROUTING
  // ============================================

  /** University data loaded from React Router loader function */
  const loaderData = useLoaderData();
  /** Safely ensure universities is always an array to prevent map errors */
  const universities = Array.isArray(loaderData) ? loaderData : [];
  /** Programmatic form submission for real-time filtering without page reload */
  const submit = useSubmit();

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  /** User's academic scores used for eligibility checking against university requirements */
  const [scores, setScores] = useState({ gpa: "", ielts: "" });

  /** Currently selected university for the application modal */
  const [selectedUni, setSelectedUni] = useState(null);
  /** Current step in the two-step application process (1: Personal Info, 2: Confirmation) */
  const [step, setStep] = useState(1);
  /** Form data for application submission (student name and email) */
  const [formData, setFormData] = useState({ studentName: "", email: "" });

  /** Array of universities selected for comparison (max 3) */
  const [compareList, setCompareList] = useState([]);
  /** Controls visibility of the comparison modal */
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ============================================
  // EVENT HANDLERS
  // ============================================

  /**
   * Toggles a university in/out of the comparison list
   * - If already in list: removes it
   * - If under 3 universities: adds it
   * - If at limit (3): shows alert and doesn't add
   *
   * @param {Object} uni - University object to toggle
   */
  const handleCompareToggle = (uni) => {
    if (compareList.find((u) => u.id === uni.id)) {
      // Remove from comparison list
      setCompareList(compareList.filter((u) => u.id !== uni.id));
    } else if (compareList.length < 3) {
      // Add to comparison list
      setCompareList([...compareList, uni]);
    } else {
      // Limit reached - show alert
      alert("You can only compare up to 3 universities at a time.");
    }
  };
  /**
   * Handles real-time filter changes (country, degree level, max fee)
   * Submits the form programmatically to update URL params and trigger React Router loader
   * The 'replace: true' option prevents adding to browser history on each keystroke
   *
   * @param {Event} event - Input/select change event
   */
  const handleFilterChange = (event) => {
    submit(event.currentTarget.closest("form"), { replace: true });
  };
  /**
   * Submits the final application to the backend API (Step 2 of application process)
   *
   * Process:
   * 1. Shows loading toast notification
   * 2. POSTs application data to backend
   * 3. Updates toast with success/error message
   * 4. Closes modal and resets state on success
   *
   * Data sent: studentName, email, universityId, GPA, IELTS scores
   */
  const handleApplyFinal = async () => {
    const loadingToast = toast.loading("Submitting application...");

    try {
      // Send application data to backend API
      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: formData.studentName,
          email: formData.email,
          universityId: selectedUni.id,
          gpa: scores.gpa,
          ielts: scores.ielts,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Success: update toast, close modal, reset state
        toast.success(result.message, { id: loadingToast });
        setSelectedUni(null);
        setStep(1);
      } else {
        // API error: show error message from server
        toast.error(result.message, { id: loadingToast });
      }
    } catch (err) {
      // Network/connection error
      toast.error("Connection error. Try again.", { id: loadingToast });
    }
  };

  /**
   * DEPRECATED: Old application handler without email field
   * @deprecated Use handleApplyFinal instead - this version is missing email field
   * TODO: Remove this function in next cleanup
   */
  const handleApply = async () => {
    const response = await fetch("http://localhost:5000/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName: formData.studentName,
        universityId: selectedUni.id,
        gpa: scores.gpa,
        ielts: scores.ielts,
      }),
    });

    const result = await response.json();
    alert(result.message);
    if (response.ok) setSelectedUni(null);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-celadon  pb-20">
      {/* Toast notification container for user feedback throughout the application */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* ========================================
          HERO SECTION - Landing area with headline and search
          ======================================== */}
      <section className="relative h-[85vh] flex flex-col items-center justify-center  text-porcelain overflow-hidden">
        {/* Background decorative layer (currently empty, can add patterns/graphics) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">

        </div>

        <div className="z-10 text-center px-6 max-w-5xl">
          {/* Main headline with fade-up animation on page load */}
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl text-teagreen font-black tracking-tighter mb-8 leading-tight"
          >
            Your Global Education <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-carbonblack to-mint">
              Starts Here.
            </span>
          </motion.h1>

          {/* Subheading with delayed animation for staggered effect */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-2xl text-carbonblack mb-12 max-w-3xl mx-auto font-medium"
          >
            Join 50,000+ students. Browse top-tier universities worldwide and
            <span className="text-teagreen"> Quick Apply</span> to your dream
            program today.
          </motion.p>

          {/* Search/Filter form - triggers React Router loader on change for live filtering */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-porcelain p-3 rounded-4xl shadow-2xl w-full max-w-4xl mx-auto"
          >
            {/* React Router Form - updates URL params on change, triggering data refetch */}
            <Form
              method="get"
              onChange={handleFilterChange}
              className="flex flex-col md:flex-row items-center gap-2 text-gray-800"
            >
              {/* Country filter input */}
              <div className="flex-1 flex items-center px-6 py-2 border-r border-gray-100 group w-full">
                <Globe className="text-mint mr-3" size={22} />
                <input
                  type="text"
                  name="country"
                  placeholder="Where do you want to study?"
                  className="w-full py-3 outline-none text-lg font-semibold placeholder:text-gray-300"
                />
              </div>

              {/* Degree level filter dropdown */}
              <div className="flex-1 px-6 py-2 flex items-center group w-full">
                <GraduationCap className="text-mint mr-3" size={22} />
                <select
                  name="degree"
                  className="w-full py-3 bg-transparent outline-none cursor-pointer text-lg font-semibold text-gray-700"
                >
                  <option value="">All Degree Levels</option>
                  <option value="Bachelors">Bachelors Degree</option>
                  <option value="Masters">Masters Degree</option>
                  <option value="PhD">Doctorate (PhD)</option>
                </select>
              </div>
            </Form>
          </motion.div>

          {/* Statistics display with delayed animation for visual hierarchy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex justify-center gap-8 text-carbonblack text-sm font-bold uppercase tracking-widest"
          >
            <div className="flex items-center gap-2">
              <span className="text-mint text-xl">200+</span> Universities
            </div>
            <div className="flex items-center gap-2">
              <span className="text-mint text-xl">15+</span> Countries
            </div>
            <div className="flex items-center gap-2">
              <span className="text-mint text-xl">100%</span> Verified
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          MAIN CONTENT AREA - Sidebar + University Grid
          ======================================== */}
      <div className="p-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-10">

        {/* ========================================
            SIDEBAR - Academic Profile & Filters
            ======================================== */}
        <aside className="md:w-1/4 p-6 bg-porcelain rounded-2xl shadow-xl h-fit sticky top-5">
          <h3 className="font-bold mb-4 text-slate-800">
            Your Academic Profile
          </h3>
          <div className="space-y-4">
            {/* GPA input - dynamically updates eligibility badges on university cards */}
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">
                Your GPA
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="0.00"
                className="w-full border-b-2 p-2 outline-none focus:border-mint-500"
                onChange={(e) => setScores({ ...scores, gpa: e.target.value })}
              />
            </div>
            {/* IELTS input - dynamically updates eligibility badges on university cards */}
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">
                Your IELTS
              </label>
              <input
                type="number"
                step="0.5"
                placeholder="0.0"
                className="w-full border-b-2 p-2 outline-none focus:border-mint-500"
                onChange={(e) =>
                  setScores({ ...scores, ielts: e.target.value })
                }
              />
            </div>
          </div>

          {/* Maximum tuition fee filter - triggers server-side filtering */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Form
              onChange={(e) => submit(e.currentTarget)}
              className="flex flex-col md:flex-row justify-center items-center gap-4"
            >
              <div className="bg-porcelain p-3 rounded-xl flex items-center gap-3">
                <span className="text-sm">Max Fee</span>
                <input
                  name="maxFee"
                  type="range"
                  min="1000"
                  max="60000"
                  className="w-48 accent-mint"
                />
              </div>
            </Form>
          </motion.div>
        </aside>

        {/* ========================================
            UNIVERSITY GRID - Dynamic university cards
            ======================================== */}
        <div className="md:w-3/4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {universities.map((uni) => {
            // Calculate real-time eligibility based on user's scores vs. university requirements
            const userGPA = parseFloat(scores.gpa) || 0;
            const userIELTS = parseFloat(scores.ielts) || 0;
            const isEligible =
              userGPA >= parseFloat(uni.min_gpa) &&
              userIELTS >= parseFloat(uni.min_ielts);

            return (
              <motion.div
                layout // Enables smooth repositioning when filters change
                key={uni.id}
                className="bg-porcelain rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                {/* University hero image with zoom-on-hover effect */}
                <div className="h-40 w-full overflow-hidden relative">
                  <img
                    src={
                      uni.image_url ||
                      "https://via.placeholder.com/400x200?text=University"
                    }
                    alt={uni.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {/* Dynamic eligibility badge - green if requirements met, red otherwise */}
                  <div
                    className={`absolute top-4 right-4 text-[10px] font-black px-2 py-1 rounded-full shadow-sm z-10 ${
                      isEligible
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isEligible ? "✓ ELIGIBLE" : "✕ NOT ELIGIBLE"}
                  </div>
                </div>

                {/* Card body: university details and actions */}
                <div className="p-6">
                  {/* University name */}
                  <h2 className="text-xl font-bold text-huntergreen mb-2">
                    {uni.name}
                  </h2>
                  {/* Location and degree type metadata */}
                  <p className="text-gray-400 text-sm mb-4">
                    {uni.country} • {uni.degree_level}
                  </p>

                  {/* Tuition fee display and comparison checkbox */}
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">
                        Annual Tuition
                      </p>
                      <p className="text-mint font-bold">
                        ${uni.tuition.toLocaleString()}
                      </p>
                    </div>
                    {/* Comparison checkbox - adds/removes university from compare list */}
                    <label className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-mint focus:ring-mint"
                        checked={compareList.some((u) => u.id === uni.id)}
                        onChange={() => handleCompareToggle(uni)}
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        Compare
                      </span>
                    </label>
                  </div>

                  {/* Quick Apply button - disabled if user doesn't meet requirements */}
                  <button
                    disabled={!isEligible}
                    onClick={() => {
                      setSelectedUni(uni);
                      setStep(1);
                    }}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      isEligible
                        ? "bg-mint text-porcelain hover:bg-mint-700 shadow-lg shadow-mint-100"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isEligible ? "Quick Apply" : "Requirements Not Met"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================
          FLOATING COMPARE BUTTON
          Appears when 2+ universities are selected for comparison
          ======================================== */}
      <AnimatePresence>
        {compareList.length >= 2 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-mint text-porcelain px-8 py-4 rounded-full shadow-2xl font-black flex items-center gap-3 hover:bg-mint-700 hover:scale-105 active:scale-95 transition-all"
            >
              {/* Badge showing count of selected universities */}
              <div className="bg-huntergreen text-porcelain w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {compareList.length}
              </div>
              COMPARE NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================
          COMPARISON MODAL
          Side-by-side comparison of selected universities
          ======================================== */}
      {isModalOpen && (
        <ComparisonSection
          selectedUnis={compareList}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* ========================================
          APPLICATION MODAL
          Two-step application process with form validation
          ======================================== */}
      <AnimatePresence>
        {selectedUni && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-porcelain rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              {/* Close button - resets modal state */}
              <button
                onClick={() => setSelectedUni(null)}
                className="absolute top-4 right-4 text-slate-400"
              >
                ✕
              </button>
              {/* Modal header with university name */}
              <h2 className="text-2xl font-bold mb-2">
                Apply to {selectedUni.name}
              </h2>
              {/* Progress indicator */}
              <p className="text-gray-400 text-sm mb-6">Step {step} of 2</p>

              {/* STEP 1: Personal Information */}
              {step === 1 ? (
                <div className="space-y-4">
                  {/* Student name input */}
                  <input
                    placeholder="Full Name"
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 ring-mint-500"
                    onChange={(e) =>
                      setFormData({ ...formData, studentName: e.target.value })
                    }
                  />
                  {/* Email input */}
                  <input
                    placeholder="Email Address"
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 ring-mint-500"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {/* Proceed to confirmation step */}
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-mint text-porcelain py-3 rounded-xl font-bold"
                  >
                    Next
                  </button>
                </div>
              ) : (
                // STEP 2: Confirmation and submission
                <div className="space-y-4">
                  {/* Display summary of academic scores for review */}
                  <div className="bg-mint-50 p-4 rounded-xl border border-mint-100 text-sm">
                    <strong>Confirming Data:</strong> GPA {scores.gpa} | IELTS{" "}
                    {scores.ielts}
                  </div>
                  {/* Submit application to backend */}
                  <button
                    onClick={handleApplyFinal}
                    className="w-full bg-mint text-porcelain py-3 rounded-xl font-bold"
                  >
                    Submit to Database
                  </button>
                  {/* Allow user to go back and edit information */}
                  <button
                    onClick={() => setStep(1)}
                    className="w-full text-gray-400 text-sm"
                  >
                    Back to Step 1
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UniversityFilterSection;
