import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

function SearchInput({ className, placeholder = "Search...", value, onChange, ...props }) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search size={15} className="absolute left-3.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
        {...props}
      />
    </div>
  );
}

export default SearchInput;
