import { useState, type SetStateAction } from 'react'
import useCreateWidget from '../../hooks/useCreateWidget/useCreateWidget'

import './Widget.css'

export const Widget = () => {
    const[content, setContent] = useState('');

  const { createWidget, loading: creatingWidget, error: createWidgetError, data: newWidget } = useCreateWidget();

  const handleSubmit = async () => {
    try {
      const created = await createWidget(content);
    } catch (e) {
      console.error("Failed to create widget:", e);
    }
  };

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) =>{
        setContent(e.target.value)
    }

    return (
    <>
        <div className='container'>
            <div className='innerWidget'>
                <label htmlFor="widget-content">Create</label>
                <input className="textInput" id="widget-content" type="textarea" onChange={handleChange} value={content} />
                <button onClick={handleSubmit}>Submit widget</button>
            </div> 
        </div>
    </>
    )
}

export default Widget;