export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#000080]/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#000080] rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-lg text-[#000080]/80">Loading products...</p>
    </div>
  );
} 