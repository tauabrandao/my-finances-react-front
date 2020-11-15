import React from 'react'

function DangerAlert(props) {
    if (props.children != null) {
        return (
            <>
                <br />
                <div class="alert alert-danger" role="alert">
                    {props.children}
                </div>
            </>
        )
    }else{
        return null
    }
}

export default DangerAlert