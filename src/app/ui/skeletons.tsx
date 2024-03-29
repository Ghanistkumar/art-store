const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function ViewProductSkeleton() {
  return (
    <div
      className={`${shimmer} min-h-screen bg-gray-100 flex items-center justify-center`}
    >
      <div className="max-w-4xl w-full p-4 md:p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="relative h-96 md:h-full"></div>
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4"></h1>
            <p className="text-gray-600 mb-6"></p>
            <div className="flex items-center mb-4">
              <span className="text-lg font-semibold mr-2"></span>
              <span className="text-xl font-bold text-blue-600"></span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-lg font-semibold mr-2"></span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"></button>
          </div>
        </div>
      </div>
    </div>
  );
}
