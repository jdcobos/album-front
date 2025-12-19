import { Popup } from 'antd-mobile'
import { useEffect, useState } from 'react';

const AddMultimedia = ({open}: any) => {

    const [openPopup, setOpenPopup] = useState(open)

    useEffect(()=>{
       setOpenPopup(open)
    },[open])

    return <Popup visible={openPopup}>
            <div>
                Prueba
            </div>
        </Popup>;
};

export default AddMultimedia;