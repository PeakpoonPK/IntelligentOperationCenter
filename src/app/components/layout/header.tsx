import { Calendar, Menu } from "lucide-react";
import { useFilter } from "../../context/filter-context";
import { useSidebar } from "../../context/sidebar-context";
import { FilterDropdownHeader } from "./filter-dropdown-header";
import { NotificationDropdown } from "./notification-dropdown";
import { UserDropdown } from "./user-dropdown";

export function Header() {
    const {
        dateRange,
        setDateRange,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        department,
        setDepartment,
        fund,
        setFund,
    } = useFilter();

    const { toggle } = useSidebar();

    const handleCustomDateChange = (start: string, end: string) => {
        setCustomStartDate(start);
        setCustomEndDate(end);
    };

    return (
        <header className="fixed top-0 right-0 left-0 lg:left-[240px] z-40">
            {/* Intelligent Operation Center (IOC) container */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl border-b border-slate-700/30"></div>

            {/* Content */}
            <div className="relative">
                {/* Desktop Layout - Single Row */}
                <div className="hidden lg:flex items-center justify-between h-[60px] px-6">
                    {/* Left: Title */}
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-[#6366F1] to-[#8B5CF6] rounded-full"></div>
                        <h1 className="text-sm font-semibold text-white">Dashboard ผู้บริหาร</h1>
                    </div>

                    {/* Center: Filters */}
                    <div className="flex items-center gap-2">
                        <FilterDropdownHeader
                            icon={<Calendar className="w-3.5 h-3.5 text-indigo-400" />}
                            value={dateRange}
                            options={["วันนี้", "สัปดาห์นี้", "เดือนนี้", "กำหนดเอง"]}
                            onChange={setDateRange}
                            customDate={true}
                            onCustomDateChange={handleCustomDateChange}
                            customStartDate={customStartDate}
                            customEndDate={customEndDate}
                        />

                        <FilterDropdownHeader
                            value={department}
                            options={[
                                "ทุกแผนก",
                                "ศัลยกรรม",
                                "อายุรกรรม",
                                "กุมารเวชกรรม",
                                "รังสีวิทยา",
                                "ทันตกรรม",
                                "สูติ-นรีเวช",
                            ]}
                            onChange={setDepartment}
                        />

                        <FilterDropdownHeader
                            value={fund}
                            options={["ทุกกองทุน", "สปสช.", "ประกันสังคม", "จ่ายเอง", "บริษัทประกัน", "อื่นๆ"]}
                            onChange={setFund}
                        />
                    </div>

                    {/* Right: Notifications & User */}
                    <div className="flex items-center gap-2">
                        <NotificationDropdown />
                        <UserDropdown />
                    </div>
                </div>

                {/* Mobile/Tablet Layout - Two Rows */}
                <div className="lg:hidden">
                    {/* Top row - Title and User Controls */}
                    <div className="flex items-center justify-between h-[56px] px-3 sm:px-4">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggle}
                                className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg 
                           hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            <div className="w-1 h-6 flex-shrink-0 bg-gradient-to-b from-[#6366F1] to-[#8B5CF6] rounded-full"></div>
                            <h1 className="text-xs sm:text-sm font-semibold text-white truncate">
                                Dashboard ผู้บริหาร
                            </h1>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                            {/* Notifications */}
                            <NotificationDropdown />

                            {/* User Avatar */}
                            <UserDropdown />
                        </div>
                    </div>

                    {/* Bottom row - Filters */}
                    <div className="flex items-center gap-1.5 px-3 sm:px-4 pb-2 overflow-x-auto scrollbar-hide">
                        {/* Date Range Picker */}
                        <FilterDropdownHeader
                            icon={<Calendar className="w-3.5 h-3.5 text-indigo-400" />}
                            value={dateRange}
                            options={["วันนี้", "สัปดาห์นี้", "เดือนนี้", "กำหนดเอง"]}
                            onChange={setDateRange}
                            customDate={true}
                            onCustomDateChange={handleCustomDateChange}
                            customStartDate={customStartDate}
                            customEndDate={customEndDate}
                            compact={true}
                        />

                        {/* Department Dropdown */}
                        <FilterDropdownHeader
                            value={department}
                            options={[
                                "ทุกแผนก",
                                "ศัลยกรรม",
                                "อายุรกรรม",
                                "กุมารเวชกรรม",
                                "รังสีวิทยา",
                                "ทันตกรรม",
                                "สูติ-นรีเวช",
                            ]}
                            onChange={setDepartment}
                            compact={true}
                        />

                        {/* Fund Dropdown */}
                        <FilterDropdownHeader
                            value={fund}
                            options={["ทุกกองทุน", "สปสช.", "ประกันสังคม", "จ่ายเอง", "บริษัทประกัน", "อื่นๆ"]}
                            onChange={setFund}
                            compact={true}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
