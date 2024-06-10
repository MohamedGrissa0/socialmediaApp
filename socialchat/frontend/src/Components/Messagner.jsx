import React from 'react';
import "animate.css"
export default function Messagner() {
  return (
    <div className='bg-white shadow mt-4 rounded-lg w-full max-w-xs animate__animated animate__fadeInRight'>
      <div className="text-sm p-6 w-full">
        <div className="flex justify-between items-center">
          <p className="text-md font-semibold">Contacts</p>
        </div>
        <div className='flex items-center justify-between'>
          <div className="flex items-center mt-4 space-x-4">
            <div className="w-12 h-12">
              <img 
                alt="Profile" 
                src="https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600" 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <p className="font-medium">Grissa Mohamed</p>
          </div>
          <div className='flex items-center'>
            <p className='text-6xl text-green-500'>.</p>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className="flex items-center mt-4 space-x-4">
            <div className="w-12 h-12">
              <img 
                alt="Profile" 
                src="https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=600" 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <p className="font-medium">Grissa Mohamed</p>
          </div>
          <div className='flex items-center'>
            <p className='text-6xl text-green-500'>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
