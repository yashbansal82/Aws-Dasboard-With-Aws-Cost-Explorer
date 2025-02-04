const ServiceCard = ({ title, category, price, gradient }) => (
  <div
    className={`bg-gradient-to-r ${gradient} rounded-lg overflow-hidden border border-gray-700 hover:shadow-lg transition-shadow duration-300`}
  >
    <div className="p-4 border-b border-gray-700">
      <div className="text-lg font-semibold text-white">
        {title}
        <span className="ml-2 text-sm text-gray-400">{category}</span>
      </div>
    </div>
    <div className="p-4 text-lg text-blue-300">{price}</div>
  </div>
);

export default ServiceCard;
