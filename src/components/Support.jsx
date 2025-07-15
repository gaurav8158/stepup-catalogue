"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BackBtn from "./BackBtn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import toast from "react-hot-toast";
const SupportPage = () => {
  const [queryText, setQueryText] = useState("");
  const [queries, setQueries] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Submit new query
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!queryText.trim()) return;

    const user = localStorage.getItem("user");
    if (!user) return;

    const userdata = JSON.parse(user);
    if (!userdata || !userdata.id) {
      toast.error("User not found. Please log in.");
      return;
    }
    try {
      await axios.post(`${BaseUrl}/support`, {
        userId: userdata.id,
        query: queryText.trim(),
      });

      setQueryText("");
      fetchQueries();
    } catch (err) {
      console.error("Error submitting query:", err);
    }
  };

  // Fetch all queries
  const fetchQueries = async () => {
    try {
      const user = localStorage.getItem("user");
      const userdata = JSON.parse(user);
      if (!userdata || !userdata.id) return;
      const response = await axios.get(
        `${BaseUrl}/support/user/${userdata.id}`
      );
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  // Send reply to a query
  const handleReply = async (queryId) => {
    const message = replyTexts[queryId]?.trim();
    if (!message) return;

    try {
      await axios.put(`${BaseUrl}/support/${queryId}`, {
        message,
        sender: "user",
        currentStatus: "Pending At Admin",
      });

      // Refresh messages
      fetchQueries();

      // Clear input
      setReplyTexts((prev) => ({
        ...prev,
        [queryId]: "",
      }));
    } catch (err) {
      console.error("Reply failed", err);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackBtn text="Back" link="/user" />
          <h1 className="text-2xl font-semibold">Support & Queries</h1>
        </div>
      </div>

      {/* New Query Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <label className="block text-sm font-medium text-gray-700">
          Ask your query
        </label>
        <textarea
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Enter your question or issue..."
          className="w-full min-h-[100px] border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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

        <Accordion type="single" collapsible>
          {queries.length === 0 ? (
            <p className="text-gray-500 text-sm">No queries submitted yet.</p>
          ) : (
            queries.map((q, index) => (
              <div
                key={q._id}
                className="border my-4 border-gray-200 px-4 py-2 rounded-2xl bg-white shadow-sm"
              >
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger>
                    <div className="flex justify-between gap-2 items-center ">
                      <span className="text-sm font-medium text-gray-700">
                        {q.query}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          q.currentStatus === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {q.currentStatus !== "Resolved"
                          ? "Pending"
                          : q.currentStatus}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Message Thread */}
                    {q?.messages?.length > 0 ? (
                      <div className="space-y-2 my-4">
                        {q.messages.map((msg, index) => (
                          <div
                            key={index}
                            className={`w-fit max-w-[80%] px-4 py-2 rounded-md shadow text-sm whitespace-pre-wrap ${
                              msg.sender === "admin"
                                ? "mr-auto bg-blue-100 text-blue-800"
                                : "ml-auto bg-green-100 text-green-800"
                            }`}
                          >
                            <p>{msg.message}</p>
                            <p className="text-xs text-gray-500 mt-1 text-right">
                              {new Date(msg.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}

                    {/* Reply Box */}
                    {q.currentStatus === "Pending At User" && (
                      <div className="mt-2 text-sm text-gray-600">
                        <input
                          type="text"
                          placeholder="Type your reply..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={replyTexts[q._id] || ""}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({
                              ...prev,
                              [q._id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={() => handleReply(q._id)}
                          className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                          disabled={!replyTexts[q._id]?.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default SupportPage;
