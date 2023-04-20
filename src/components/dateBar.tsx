import React, { useState } from "react";

interface DateBarProps {
  onDateChange: (date: Date) => void;
}

export const DateBar: React.FC<DateBarProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate((prevDate) => {
      if (prevDate.getDate() === date.getDate()) {
        return prevDate;
      }
      return date;
    });
    onDateChange(date);
  };

  const moveDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    handleDateChange(newDate);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="flex items-center justify-between w-full bg-gray-200 p-2 rounded-lg">
      <button
        className="btn btn-circle btn-primary"
        onClick={() => moveDate(-1)}
      >
        &lt;
      </button>
      <span className="flex-grow text-center">{formatDate(selectedDate)}</span>
      <button
        className="btn btn-circle btn-primary"
        onClick={() => moveDate(1)}
      >
        &gt;
      </button>
    </div>

  );
};
