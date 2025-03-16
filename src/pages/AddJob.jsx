import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
const AddJob = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("johannesburg");
    const [category, setCategory] = useState("Locum");
    const [level, setLevel] = useState("entry");
    const [salary, setSalary] = useState(0);
    const editorRef = useRef(null);
    const quilRef = useRef(null);

    useEffect(() => {
        //initialise quil only once
        if (!quilRef.current && editorRef) {
            quilRef.current = new Quill(editorRef.current, {
                theme: "snow",

            })
        }
    }, [])
    return (
        <form className='container p-4 flex flex-col w-full items-start gap-3'>
            <div className='w-full'>
                <p className='mb-2'>Job Title</p>
                <input 
                type="text" 
                placeholder='type here' 
                onChange={e => setTitle(e.target.value)}
                value={title}
                required
                className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
                />
            </div>

            <div className='w-full max-w-lg'>
                <p className='my-2'>Job Description</p>
                <div ref={editorRef}>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Job Category</p>
                    <select className='w-full px-3 py-2 border-gray-300 border rounded' onChange={e => setCategory(e.target.value)}>
                        {JobCategories.map((category , index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>

                </div>

                <div>
                    <p className='mb-2'>Job Location</p>
                    <select className='w-full border px-3 py-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((location , index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>

                </div>

                <div>
                    <p className='mb-2'>Job Level</p>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded' onChange={e => setLevel(e.target.value)}>
                            <option value="Beginner">Beginner</option> 
                            <option value="Intermediate">Intermediate</option> 
                            <option value="Senior">Senior</option> 
                    </select>

                </div>

               
            </div>
            <div>
                    <p className='mb-2'>Salary</p>
                    <input className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' min={0} onChange={e => setSalary(e.target.value)} type="number" placeholder='0' />
                </div>
            <button className='w-25 py-3 mt-4 bg-black text-white rounded'>ADD</button>
        </form>
    )
}

export default AddJob
