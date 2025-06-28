import { useState, useEffect } from 'react'
import { getWidgets } from '../../requests/getWidgets/getWidgets';

export const useGetWidgets = (enabled: boolean) => {
const [data, setData] = useState<[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);

        const result = await getWidgets();

        if(result){
            setLoading(false);
            setData(result)
        }else{
            setError(result)
        }
    }

    fetchData()
}, [enabled])

return { data, loading, error }
};