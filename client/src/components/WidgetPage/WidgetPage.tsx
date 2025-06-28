import { useState } from 'react'
import { useGetWidgets } from "../../hooks/useGetWidgets/useGetWidgets"
import Widget from '../Widget'


const WidgetPage = () => {
const [addWidget, setAddWidget] = useState(false)
const [a, b] = useState(false)

const handleAddWidget = () => {
    console.log('add widget')
    setAddWidget(true)
    b(true)
}

const { data, loading, error } = useGetWidgets(a);

const { widgets = [] } = data

return (
    <>
    <button onClick={handleAddWidget}>Add widget</button>

     {!!addWidget && (
        <Widget />
    )}

    {widgets.length >= 1 && widgets.map((widget) => (
        <Widget widget={widget}/>
    ))}


    </>
)
}

export default WidgetPage;