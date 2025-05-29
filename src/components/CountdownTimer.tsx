"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transform transition-transform hover:scale-105 border border-gray-100">
            <span className="text-5xl md:text-6xl font-semibold text-red-500">
              {formatNumber(timeLeft.days)}
            </span>
          </div>
          <div className="mt-2 text-sm uppercase tracking-wide font-medium text-white">
            DAYS
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transform transition-transform hover:scale-105 border border-gray-100">
            <span className="text-5xl md:text-6xl font-semibold text-red-500">
              {formatNumber(timeLeft.hours)}
            </span>
          </div>
          <div className="mt-2 text-sm uppercase tracking-wide font-medium text-white">
            HOURS
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transform transition-transform hover:scale-105 border border-gray-100">
            <span className="text-5xl md:text-6xl font-semibold text-red-500">
              {formatNumber(timeLeft.minutes)}
            </span>
          </div>
          <div className="mt-2 text-sm uppercase tracking-wide font-medium text-white">
            MINUTES
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transform transition-transform hover:scale-105 border border-gray-100">
            <span className="text-5xl md:text-6xl font-semibold text-red-500">
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
          <div className="mt-2 text-sm uppercase tracking-wide font-medium text-white">
            SECONDS
          </div>
        </div>
      </div>
    </div>
  );
}
