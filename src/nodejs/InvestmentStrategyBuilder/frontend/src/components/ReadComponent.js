import React from 'react'
import '../styles/ReadPStrategy.css'
export default function ReadComponent(props) {
    let {name,description} = props;
    return (
        <>
            <div className='readComp'>

                    <div className='bookmark'>
                    {name}
                    </div>
                    <div className='text-details'>
                    {description}
                </div>
            </div>
        </>
    )
}


