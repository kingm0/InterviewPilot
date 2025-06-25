import React from "react";
import InterviewerStats from "./InterviewerStats";
import { motion } from "framer-motion";
import {
  PieChart,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BarChart2,
  LineChart,
  Radar,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
} from "recharts";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl shadow-lg bg-white border p-4 ${className}`}>{children}</div>
);

const Section = ({ title, children, icon: Icon, className = "" }) => (
  <Card className={`border-l-4 p-6 ${className}`}>
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon className="text-blue-600" />}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </Card>
);

const ProgressBar = ({ value }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full">
    <div
      className="h-full bg-blue-600 rounded-full transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);

const confidenceOverTime = [
  { time: "0m", confidence: 60 },
  { time: "5m", confidence: 65 },
  { time: "10m", confidence: 70 },
  { time: "15m", confidence: 75 },
  { time: "20m", confidence: 82 },
  { time: "25m", confidence: 85 },
];

const stressLevels = [
  { time: "0m", stress: 40 },
  { time: "5m", stress: 55 },
  { time: "10m", stress: 70 },
  { time: "15m", stress: 60 },
  { time: "20m", stress: 45 },
];

const topicConfidence = [
  { topic: "Communication", score: 85 },
  { topic: "Technical", score: 68 },
  { topic: "Leadership", score: 78 },
  { topic: "Product", score: 88 },
];

const dimensionScores = [
  { axis: "Communication", score: 85 },
  { axis: "Technical", score: 72 },
  { axis: "Culture Fit", score: 80 },
  { axis: "Adaptability", score: 76 },
  { axis: "Confidence", score: 88 },
];

export default function InterviewDashboard({ hideInterviewerView = false }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8 space-y-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-4xl font-bold text-blue-800 flex items-center gap-2">
          <Sparkles className="text-yellow-400 animate-pulse" /> Interview Summary
        </h1>
        <div className="space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Download PDF</button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">Send to Teams</button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">Email</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          "Candidate: Anushka Kalita",
          "Date: Jun 20, 2025",
          "Fit Score: 72",
          "Communication Score: 85 (Excellent)",
        ].map((text, idx) => {
          const [label, rawValue] = text.split(":");
          const value = /Score/.test(label) ? rawValue?.match(/\d+/)?.[0] : null;
          return (
            <Card key={idx} className="text-sm text-gray-600">
              <div>{label}</div>
              <div className="text-lg font-semibold text-gray-800">{rawValue?.trim()}</div>
              {value && (
                <div className="mt-2">
                  <ProgressBar value={parseInt(value)} />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Talk Ratio" icon={PieChart} className="border-blue-500">
          <p className="text-sm text-gray-700">Interviewer: 40%</p>
          <p className="text-sm text-gray-700">Candidate: 60%</p>
        </Section>

        <Section title="Bias Indicator" icon={AlertCircle} className="border-yellow-400">
          <p className="text-yellow-600 text-sm">Potential topic bias detected (mostly technical)</p>
        </Section>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Strengths" className="border-green-400">
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Clear communication and structure</li>
            <li>Strong understanding of product lifecycle</li>
            <li>Good stakeholder management examples</li>
          </ul>
        </Section>

        <Section title="Weaknesses" className="border-red-400">
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Lacks hands-on technical experience</li>
            <li>Limited exposure to data analysis</li>
          </ul>
        </Section>
      </div>

      <Section title="Transcript Highlights" className="border-blue-100">
        <div className="space-y-2 text-gray-700 italic text-sm">
          <p>"In my last role, I led the redesign of our onboarding flow which increased activation by 18%."</p>
          <p>"I usually prioritize user research early in the product development cycle."</p>
          <p>"While I don't code regularly, I collaborate closely with engineering to define scope."</p>
        </div>
      </Section>
      
    

      {/* ✅ Interviewer stats before AI recommendation */}
      <InterviewerStats hideInterviewerView={hideInterviewerView} />

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="AI Recommendation" icon={CheckCircle} className="border-green-500">
          <p className="text-green-600 font-semibold">✔ Proceed to Next Round</p>
        </Section>

        <Section title="Suggested Follow-up Questions" className="border-blue-400">
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Can you describe a time you used data to influence a product decision?</li>
            <li>How do you handle conflicts between design and engineering?</li>
          </ul>
        </Section>
      </div>

      {!hideInterviewerView && (
        <div className="grid md:grid-cols-2 gap-6">
          <Section title="Feedback for Candidate" className="border-blue-500">
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Great communication and storytelling.</li>
              <li>Consider deepening technical knowledge for product depth.</li>
            </ul>
          </Section>

          <Section title="Feedback for Interviewer" className="border-yellow-400">
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Improve balance of behavioral and technical questions.</li>
              <li>Allow more uninterrupted speaking time for the candidate.</li>
            </ul>
          </Section>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Confidence Over Time" icon={LineChart} className="border-blue-400">
          <ResponsiveContainer width="100%" height={200}>
            <RechartsLineChart data={confidenceOverTime}>
              <Line type="monotone" dataKey="confidence" stroke="#3b82f6" strokeWidth={3} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </RechartsLineChart>
          </ResponsiveContainer>
        </Section>

        <Section title="Stress Levels Over Time" icon={LineChart} className="border-red-400">
          <ResponsiveContainer width="100%" height={200}>
            <RechartsLineChart data={stressLevels}>
              <Line type="monotone" dataKey="stress" stroke="#f87171" strokeWidth={3} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </RechartsLineChart>
          </ResponsiveContainer>
        </Section>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Confidence by Topic" icon={BarChart2} className="border-purple-400">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topicConfidence}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>

        <Section title="Performance Breakdown" icon={Radar} className="border-teal-400">
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart outerRadius={90} data={dimensionScores}>
              <PolarGrid />
              <PolarAngleAxis dataKey="axis" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <RechartsRadar name="Score" dataKey="score" stroke="#14b8a6" fill="#5eead4" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Section>
      </div>
    </div>
  );
}
