import { useState, type SetStateAction } from 'react'
import './Widget.css'

export const Widget = () => {
    const[content, setContent] = useState('');

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) =>{
        setContent(e.target.value)
    }

    return (
    <>
        <div className='container'>
            <div className='innerWidget'>
                <label htmlFor="widget-content">Create</label>
                <input className="textInput" id="widget-content" type="textarea" onChange={handleChange} value={content} />
            </div> 
        </div>
    </>
    )
}

export default Widget;