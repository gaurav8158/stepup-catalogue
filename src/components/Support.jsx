"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BackBtn from "./BackBtn";

const SupportPage = () => {
  const [queryText, setQueryText] = useState("");
  const [queries, setQueries] = useState([]);
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!queryText.trim()) return;

    const newQuery = {
      id: Date.now(),
      query: queryText.trim(),
      status: "Pending",
      adminReply: "",
    };
    setQueries([newQuery, ...queries]);
    const user = localStorage.getItem("user");
    if (user) {
      const userdata = JSON.parse(user);
      console.log("User data", userdata)
      try {
        const res = await axios.post(`${BaseUrl}/support`, {

          userId: userdata.id,
          query: queryText.trim(),

        })
        console.log("REs ", res);
      } catch (err) {
        console.log("Error  ", err);
      }

    }

    console.log("Query ", newQuery);
    setQueryText("");
  };
  useEffect(() => {
    const fetchQueries = async () => {

      try {
        const response = await axios.get(`${BaseUrl}/support`);
        console.log("Res ", response.data)
        setQueries(response.data);
      } catch (error) {
        console.log("Error ", error);
      }
    }
    fetchQueries();
  }, [])
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
 <div className="flex justify-between mb-6 ">
        <div className="flex items-center gap-2">
          {" "}
          <BackBtn text="Back" link="/user" />
          <h1 className="text-2xl font-semibold ">Support & Queries</h1>
        </div>
       
      </div>
      {/* Add Query Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <label className="block text-sm font-medium text-gray-700">
          Ask your query
        </label>
        <textarea
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Enter your question or issue..."
          className="w-full min-h-[100px] custom-input-class"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-medium text-sm"
        >
          Submit
        </button>
      </form>

      {/* Previous Queries */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Your Previous Queries</h2>
        {queries.length === 0 ? (
          <p className="text-gray-500 text-sm">No queries submitted yet.</p>
        ) : (
          queries.map((q) => (
            <div
              key={q.id || q._id}
              className="border border-gray-200 p-4 rounded-2xl bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {q.query}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${q.currentStatus === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {q.currentStatus || "Pending"}
                </span>
              </div>
              {q.currentStatus === "Resolved" && q.actionByAdmin && (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Admin:</strong> {q.actionByAdmin}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SupportPage;

// "use client";
// import React, { useState, useEffect } from "react";

// const SupportPage = () => {
//   const [queryText, setQueryText] = useState("");
//   const [queries, setQueries] = useState([]);

//   // Fetch queries on load
//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {
//         const res = await fetch("/api/support-queries");
//         const data = await res.json();
//         if (res.ok) setQueries(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchQueries();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!queryText.trim()) return;

//     try {
//       const res = await fetch("/api/support-queries", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: queryText }),
//       });

//       const newQuery = await res.json();
//       if (res.ok) {
//         setQueries([newQuery, ...queries]);
//         setQueryText("");
//       } else {
//         alert(newQuery.message || "Failed to submit query");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-4">Support & Queries</h1>

//       <form onSubmit={handleSubmit} className="space-y-4 mb-10">
//         <label className="block text-sm font-medium text-gray-700">
//           Ask your query
//         </label>
//         <textarea
//           value={queryText}
//           onChange={(e) => setQueryText(e.target.value)}
//           placeholder="Enter your question or issue..."
//           className="w-full min-h-[100px] rounded border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-green-500"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-medium text-sm"
//         >
//           Submit
//         </button>
//       </form>

//       <div className="space-y-6">
//         <h2 className="text-lg font-semibold">Your Previous Queries</h2>
//         {queries.length === 0 ? (
//           <p className="text-gray-500 text-sm">No queries submitted yet.</p>
//         ) : (
//           queries.map((q, idx) => (
//             <div
//               key={idx}
//               className="border border-gray-200 p-4 rounded bg-white shadow-sm"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm font-medium text-gray-700">
//                   {q.query}
//                 </span>
//                 <span
//                   className={`text-xs px-2 py-1 rounded ${
//                     q.status === "Resolved"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {q.status}
//                 </span>
//               </div>
//               {q.status === "Resolved" && q.adminReply && (
//                 <div className="mt-2 text-sm text-gray-600">
//                   <strong>Admin:</strong> {q.adminReply}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupportPage;
