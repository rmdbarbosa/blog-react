export default function Loading({ centered }) {
  return (
    <div
      className={`flex justify-center items-center p-8 ${
        centered ? "min-h-screen" : ""
      }  `}
    >
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
