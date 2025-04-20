import React,{useState} from 'react'
import { Link, usePage } from '@inertiajs/react'

import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { LineChart, Line,  } from 'recharts';


const roomStatusData = [
    { name: 'Room A', vacant: 3, booked: 2 },
    { name: 'Room B', vacant: 1, booked: 4 },
    { name: 'Room C', vacant: 5, booked: 0 },
    { name: 'Room D', vacant: 0, booked: 6 },
];

const lineKeys = [
    { key: 'revenue', color: '#60a5fa' }, // blue
];


export default function Dashboard(props) {
    
    function getRandomLightColor() {
        const r = Math.floor(100 + Math.random() * 100); // 100–200
        const g = Math.floor(100 + Math.random() * 100);
        const b = Math.floor(100 + Math.random() * 100);
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    
    const pieData = props.vehicle_types.map(item => ({
        name: item.name,
        value: item.total,
        color: getRandomLightColor(),
    }));

    const monthly_revenue = props.monthly_revenue.map(item => ({
        name: item.month_year,
        sales: item.total_amount
      }));

    const revenue_on_previous_days = props.revenue_on_previous_days.map(item => ({
        month: item.created_date,
        revenue: item.total_amount
      }));
      

    return (
        <>
            <SpaceOwnerLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 text-black dark:text-white ml-2 ">
                            <li className="flex align-middle font-semibold text-md ml-2">
                                <Link href="/spaceowner/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-md ml-1">
                                <Link href="/spaceowner/dashboard">
                                    Dashboard 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="w-50 flex justify-between">
                        <div className="flex m-5 w-full">
                            <div className="grid grid-cols-12 gap-4 w-full">
                                {/* <div className="col-span-12 h-[300px] mt-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <h6 className="flex justify-center text-md font-semibold">
                                            Label 1
                                        </h6>
                                        <BarChart data={roomStatusData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="vacant" stackId="a" fill="#4ade80" />
                                            <Bar dataKey="booked" stackId="a" fill="#f87171" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div> */}
                                <div className="col-span-6 h-[300px] mt-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <h6 className="flex justify-center text-md font-semibold">
                                            Monthly Revenue
                                        </h6>
                                        <BarChart data={monthly_revenue}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="sales" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="col-span-6 flex justify-center items-center h-[300px] mt-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <h6 className="flex justify-center text-md font-semibold">
                                            Rents Vehicle Types
                                        </h6>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                label={({ name, percent }) => `${name}(${(percent * 100).toFixed(0)}%)`}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>

                                </div>
                                <div className="col-span-12 flex justify-center items-center h-[300px] mt-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <h6 className="flex justify-center text-md font-semibold">
                                            Daily Revenue
                                        </h6>
                                        <LineChart data={revenue_on_previous_days}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {lineKeys.map((line) => (
                                            <Line
                                            key={line.key}
                                            type="monotone"
                                            dataKey={line.key}
                                            stroke={line.color}
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                            />
                                        ))}
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </SpaceOwnerLayout>
            
        
            
        </>
    )
  }