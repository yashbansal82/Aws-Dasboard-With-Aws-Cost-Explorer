// import { useState } from "react";
// import SearchBar from "./components/SearchBar";
// import RegionSelector from "./components/RegionSelector";
// import ServiceCard from "./components/ServiceCard";

// const prices = {
//   "us-east-1": {
//     ec2: "$0.0116/hour",
//     s3: "$0.023/GB",
//     rds: "$0.02/hour",
//     lambda: "$0.20/million",
//   },
//   "us-west-2": {
//     ec2: "$0.0104/hour",
//     s3: "$0.024/GB",
//     rds: "$0.021/hour",
//     lambda: "$0.20/million",
//   },
//   "eu-west-1": {
//     ec2: "$0.0124/hour",
//     s3: "$0.024/GB",
//     rds: "$0.022/hour",
//     lambda: "$0.21/million",
//   },
//   "ap-southeast-1": {
//     ec2: "$0.0132/hour",
//     s3: "$0.025/GB",
//     rds: "$0.023/hour",
//     lambda: "$0.22/million",
//   },
// };

// function App() {
//   const [region, setRegion] = useState("us-east-1");

//   return (
//     <div className="bg-gray-900 p-8 min-h-screen flex flex-col items-center">
//       <div className="max-w-6xl w-full">
//         <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
//           <div className="p-6 border-b border-gray-700 text-2xl font-bold text-blue-400 flex items-center gap-2">
//             AWS Services Regional Dashboard
//           </div>
//           <div className="p-6 flex flex-col md:flex-row gap-4">
//             <SearchBar />
//             <RegionSelector setRegion={setRegion} />
//           </div>
//           <div className="p-6 space-y-6">
//             <ServiceCard
//               title="Amazon EC2"
//               category="Compute"
//               price={prices[region].ec2}
//               gradient="from-purple-900 to-indigo-900"
//             />
//             <ServiceCard
//               title="Amazon S3"
//               category="Storage"
//               price={prices[region].s3}
//               gradient="from-blue-900 to-cyan-900"
//             />
//             <ServiceCard
//               title="Amazon RDS"
//               category="Database"
//               price={prices[region].rds}
//               gradient="from-green-900 to-teal-900"
//             />
//             <ServiceCard
//               title="AWS Lambda"
//               category="Serverless"
//               price={prices[region].lambda}
//               gradient="from-red-900 to-pink-900"
//             />
//           </div>
//         </div>
//         <div className="mt-6 text-center text-gray-400">
//           Powered by <span className="text-blue-400 font-bold">XAMMER</span>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default App;

import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RegionSelector from "./components/RegionSelector";
import ServiceCard from "./components/ServiceCard";
import axios from "axios";

const hardcodedPrices = {
  "us-east-1": {
    ec2: "$0.0116/hour",
    s3: "$0.023/GB",
    rds: "$0.02/hour",
    lambda: "$0.20/million",
  },
  "us-west-2": {
    ec2: "$0.0104/hour",
    s3: "$0.024/GB",
    rds: "$0.021/hour",
    lambda: "$0.20/million",
  },
  "eu-west-1": {
    ec2: "$0.0124/hour",
    s3: "$0.024/GB",
    rds: "$0.022/hour",
    lambda: "$0.21/million",
  },
  "ap-southeast-1": {
    ec2: "$0.0132/hour",
    s3: "$0.025/GB",
    rds: "$0.023/hour",
    lambda: "$0.22/million",
  },
};

function App() {
  const [region, setRegion] = useState("us-east-1");
  const [useHardcoded, setUseHardcoded] = useState(true);
  const [backendPrices, setBackendPrices] = useState({});

  useEffect(() => {
    if (!useHardcoded) {
      axios
        .get("https://your-backend-api.com/prices")
        .then((response) => {
          setBackendPrices(response.data);
        })
        .catch((error) => {
          console.error("Error fetching backend prices:", error);
        });
    }
  }, [useHardcoded]);

  const prices = useHardcoded ? hardcodedPrices : backendPrices;

  return (
    <div className="bg-gray-900 p-8 min-h-screen flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
          <div className="p-6 border-b border-gray-700 text-2xl font-bold text-blue-400 flex items-center gap-2">
            AWS Services Regional Dashboard
          </div>
          <div className="p-6 flex flex-col md:flex-row gap-4">
            <SearchBar />
            <RegionSelector setRegion={setRegion} />
            <label className="flex items-center gap-2 text-white">
              <span>Use Hardcoded Data</span>
              <input
                type="checkbox"
                checked={useHardcoded}
                onChange={() => setUseHardcoded(!useHardcoded)}
                className="toggle-checkbox"
              />
            </label>
          </div>
          <div className="p-6 space-y-6">
            {prices[region] ? (
              <>
                <ServiceCard
                  title="Amazon EC2"
                  category="Compute"
                  price={prices[region].ec2}
                  gradient="from-purple-900 to-indigo-900"
                />
                <ServiceCard
                  title="Amazon S3"
                  category="Storage"
                  price={prices[region].s3}
                  gradient="from-blue-900 to-cyan-900"
                />
                <ServiceCard
                  title="Amazon RDS"
                  category="Database"
                  price={prices[region].rds}
                  gradient="from-green-900 to-teal-900"
                />
                <ServiceCard
                  title="AWS Lambda"
                  category="Serverless"
                  price={prices[region].lambda}
                  gradient="from-red-900 to-pink-900"
                />
              </>
            ) : (
              <div className="text-white text-center">Loading prices...</div>
            )}
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400">
          Powered by <span className="text-blue-400 font-bold">XAMMER</span>
        </div>
      </div>
    </div>
  );
}

export default App;
