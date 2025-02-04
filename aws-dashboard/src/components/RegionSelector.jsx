const RegionSelector = ({ setRegion }) => {
  return (
    <select
      className="w-full p-2 rounded-lg bg-gray-700 border-gray-600 text-white appearance-none"
      onChange={(e) => setRegion(e.target.value)}
    >
      <option value="us-east-1">us-east-1</option>
      <option value="us-west-2">us-west-2</option>
      <option value="eu-west-1">eu-west-1</option>
      <option value="ap-southeast-1">ap-southeast-1</option>
    </select>
  );
};

export default RegionSelector;
