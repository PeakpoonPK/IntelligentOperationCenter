import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  dateRange: string;
  setDateRange: (value: string) => void;
  customStartDate: string;
  setCustomStartDate: (value: string) => void;
  customEndDate: string;
  setCustomEndDate: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
  fund: string;
  setFund: (value: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState('วันนี้');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [department, setDepartment] = useState('ทุกแผนก');
  const [fund, setFund] = useState('ทุกกองทุน');

  return (
    <FilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
