import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/app/jotaiAtoms";
import { fetchAnalyticsData } from "@/utils/adminApi";
import { toast } from "sonner";

import ErrorMessage from "../UI/ErrorMessage";

const AnalyticsReporting = () => {
  const [user] = useAtom(userAtom);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAnalytics = async () => {
    if (!user || !user.token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchAnalyticsData(user.token);
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, [user]);

  if (loading) return <p className="text-white">Loading analytics...</p>;
  if (error) return <ErrorMessage message={error} />;
  if (!analytics) return <p className="text-white">No analytics data available.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Analytics and Reporting</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-md text-center">
          <h3 className="text-lg font-semibold text-white">Total Blogs</h3>
          <p className="text-3xl font-bold text-blue-400">{analytics.totalBlogs}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-md text-center">
          <h3 className="text-lg font-semibold text-white">Total Users</h3>
          <p className="text-3xl font-bold text-green-400">{analytics.totalUsers}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-md text-center">
          <h3 className="text-lg font-semibold text-white">Total Comments</h3>
          <p className="text-3xl font-bold text-purple-400">{analytics.totalComments}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReporting;