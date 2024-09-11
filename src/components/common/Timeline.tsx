
const Timeline = () => {
  const stages = [
    { name: 'Applied', completed: true },
    { name: 'Scheduled', completed: true },
    { name: 'Hired', completed: false },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
      {stages.map((stage, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                stage.completed ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-center text-sm font-medium">{stage.name}</span>
          </div>
          {index !== stages.length - 1 && (
            <div className="w-16 h-1 mb-6 bg-gray-300 md:w-24 md:h-1 mx-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
