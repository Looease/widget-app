import { useState } from 'react'
// import { useGetWidgets } from "../../hooks/useGetWidgets/useGetWidgets"
import Widget from '../Widget'


const WidgetPage = () => {
const [addWidget, setAddWidget] = useState(false)

const handleAddWidget = () => {
    console.log('add widget')
    setAddWidget(true)
}


return (
    <>
    <button onClick={handleAddWidget}>Add widget</button>

    {!!addWidget && (
        <Widget />
    )}


    </>
)
}

export default WidgetPage