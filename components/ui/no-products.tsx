import { Search } from "lucide-react";

export function NoProducts() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
      <div className="w-24 h-24 bg-[#000080]/10 rounded-full flex items-center justify-center">
        <Search className="w-12 h-12 text-[#000080]" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-[#000080]">No Products Found</h3>
        <p className="text-[#000080]/70 max-w-md">
          We couldn't find any products matching your search. Try adjusting your filters or search terms.
        </p>
      </div>
    </div>
  );
} 