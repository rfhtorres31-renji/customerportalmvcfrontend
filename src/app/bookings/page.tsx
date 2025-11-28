"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './dashboard.css'

type Booking = {
  uuid: string;
  job_description: string;
  date: string;
  status: string;
  attachments: { id: string; name: string; url: string }[];
};


export default function BookingsPage () {

   const [bookings, setBookings] = useState<Booking[]>([]);
   const [user, setUser] = useState<string | null>("");
   const router = useRouter();

   useEffect(() => {
    fetch("http://localhost:3304/api/bookings", {
          'method': 'GET',
          'headers': {
              'Content-Type': 'application/json',
           },
    }).
    then(async res => {
        
        if (res.ok){
            const user = localStorage.getItem('user');
            setUser(user);     
        }

        const data = await res.json();
        console.log(data);
        setBookings(Array.isArray(data) ? data : []);
    }).
    catch(err=>{
        console.error(err);
    });
    
   }, []);


    return (
        <div className="main-wrapper">
        <h3>Customer Portal Dashboard, Hello {user}!</h3>
        <div className="table-container">
            <table>
            <thead>
                <tr>
                <th>Job</th>
                <th>Date</th>
                <th>Status</th>
                <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(b => (
                <tr key={b.uuid}>
                    <td>{b.job_description}</td>
                    <td>{b.date}</td>
                    <td>{b.status}</td>
                    <td>
                    <button onClick={() => router.push(`/bookings/${b.uuid}`)}>
                        View
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>

    ); 
};