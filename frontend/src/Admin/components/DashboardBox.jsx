import React from 'react'

const DashboardBox = ({ title, value, subtitle, icon, color = 'blue', onClick, trend }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
      progress: 'bg-blue-500'
    },
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      progress: 'bg-green-500'
    },
    orange: {
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-200',
      progress: 'bg-orange-500'
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200',
      progress: 'bg-purple-500'
    },
    gray: {
      bg: 'bg-gray-50',
      iconBg: 'bg-gray-100',
      text: 'text-gray-600',
      border: 'border-gray-200',
      progress: 'bg-gray-500'
    },
    red: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-200',
      progress: 'bg-red-500'
    }
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  };

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  };

  const currentColor = colorClasses[color];

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl border-2 transition-all duration-300 
        hover:shadow-lg hover:scale-[1.02] active:scale-[0.99]
        ${currentColor.bg} ${currentColor.border}
        ${onClick ? 'cursor-pointer hover:border-gray-300' : 'cursor-default'}
      `}
      onClick={onClick}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full ${currentColor.iconBg} opacity-50`}></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {trend && (
                <span className={`text-sm font-semibold ${trendColors[trend]}`}>
                  {trendIcons[trend]}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          
          {icon && (
            <div className={`
              p-3 rounded-lg transition-colors duration-200
              ${currentColor.iconBg} ${currentColor.text}
            `}>
              {icon}
            </div>
          )}
        </div>
        
        {/* Progress bar indicator */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${currentColor.progress}`}
            style={{ width: '75%' }} // This could be dynamic based on props
          ></div>
        </div>
      </div>
    </div>
  )
}

export default DashboardBox