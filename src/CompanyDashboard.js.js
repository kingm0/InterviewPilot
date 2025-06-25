import React from "react";
import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const Section = ({ title, children, icon: Icon, className = "" }) => (
  <div className={`rounded-xl border-l-4 p-6 shadow-md bg-white ${className}`}>
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon className="text-blue-600" />}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

const barStatsData = [
  { label: "Talk Time (min)", value: 12 },
  { label: "Number of Questions", value: 18 },
  { label: "Technical (%)", value: 70 },
  { label: "Behavioral (%)", value: 30 },
];

const radarStatsData = [
  { stat: "Follow-up Quality", value: 90 },
  { stat: "Listening Score", value: 85 },
  { stat: "Clarity of Questions", value: 88 },
  { stat: "Encouragement Given", value: 78 },
];

const InterviewerStats = ({ hideInterviewerView }) => {
  if (hideInterviewerView) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 space-y-6"
    >
      <Section title="Interviewer Activity Overview" icon={UserCheck} className="border-indigo-500">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barStatsData} layout="vertical" margin={{ left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="label" type="category" width={180} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      <Section title="Interviewer Quality Breakdown" icon={UserCheck} className="border-blue-500">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={100} data={radarStatsData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="stat" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#93c5fd" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </Section>
    </motion.div>
  );
};

export default InterviewerStats;
