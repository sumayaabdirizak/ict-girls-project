import React from 'react';
import DashboardBox from './DashboardBox';
import { 
  MdPeople, 
  MdGroups, 
  MdAnnouncement, 
  MdStorage,
  MdTrendingUp,
  MdSettings,
  MdWeb 
} from "react-icons/md";

const DashboardStats = () => {
  const statsData = [
    {
      title: "Total Users",
      value: "1,234",
      subtitle: "+12% from last month",
      icon: <MdPeople size={24} />,
      color: "blue",
      trend: "up",
      onClick: () => console.log("Navigate to users")
    },
    {
      title: "Active Communities",
      value: "45",
      subtitle: "8 new this month",
      icon: <MdGroups size={24} />,
      color: "green",
      trend: "up",
      onClick: () => console.log("Navigate to communities")
    },
    {
      title: "Website Visits",
      value: "5,678",
      subtitle: "Landing page views",
      icon: <MdWeb size={24} />,
      color: "purple",
      trend: "up",
      onClick: () => console.log("Navigate to website analytics")
    },
    {
      title: "Storage Used",
      value: "105GB",
      subtitle: "32% of total capacity",
      icon: <MdStorage size={24} />,
      color: "orange",
      trend: "up",
      onClick: () => console.log("Navigate to storage management")
    },
    {
      title: "Pending Actions",
      value: "23",
      subtitle: "Requires attention",
      icon: <MdSettings size={24} />,
      color: "gray",
      trend: "neutral",
      onClick: () => console.log("Navigate to pending actions")
    },
    {
      title: "Active Announcements",
      value: "12",
      subtitle: "3 scheduled",
      icon: <MdAnnouncement size={24} />,
      color: "blue",
      trend: "neutral",
      onClick: () => console.log("Navigate to announcements")
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <DashboardBox
          key={index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          color={stat.color}
          trend={stat.trend}
          onClick={stat.onClick}
        />
      ))}
    </div>
  );
};

export default DashboardStats;