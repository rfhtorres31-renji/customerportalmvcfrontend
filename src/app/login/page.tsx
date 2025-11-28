"use client";
import './login.css'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"; 

type formObj = {
  email: string, 
  phoneNo: string, 
}

export default function Login(){

    const router = useRouter();
    const [formData, setFormData] = useState<formObj>({
        email: "",
        phoneNo: "",
    })
    
    useEffect(()=>{

         localStorage.removeItem('user');

    }, 
    [])


    
    console.log(formData);

    const handleChange = (e:any) => {

         setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
         }))
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault(); // block non-digit keys
        }
    }

    const handleSubmit = (e:any) => {

        e.preventDefault();

        const apiURL = 'http://localhost:3304/api/auth'
        
        fetch(apiURL, {
           'method': 'POST',
           'headers': {
              'Content-Type': 'application/json',
           },
           'body': JSON.stringify(formData)
        }).
        then(async (res) => {

            if (!res.ok){
                const errMessage = await res.json();
                console.log(errMessage);
                const error: any = new Error(errMessage.message);
                error.status = res.status;
                throw error;
            }
            const data = await res.json();
            console.log(data);

            localStorage.setItem('user', data.user);
                  
            router.push('/bookings');

        }).
        catch((err) => {
            console.error(err.message);
            alert(err.message);
        });

    };


    return ( 
        <div className="main-wrapper">
           <form onSubmit={(e)=>handleSubmit(e)}>
               <h3>Customer Portal MVP</h3>
               <div className='form-field'>
                  <input
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={(e)=>handleChange(e)}
                    placeholder='Email'
                  />
               </div>
               <div className='form-field'>
                  <input
                    name='phoneNo'
                    type='text'
                    value={formData.phoneNo}
                    onChange={(e)=>handleChange(e)}
                    min={0}
                    onKeyPress={handleKeyPress}
                    placeholder='Phone Number'
                  />
               </div>
               <button type="submit">Login</button>
           </form>
        </div>

    ); 
};