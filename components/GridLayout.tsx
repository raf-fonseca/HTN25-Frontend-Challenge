export function GridLayout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-lg">
          Grid Item {index + 1}
        </div>
      ))}
    </div>
  );
}
