import React from 'react'
import "../styles/NoteSlider.css"

function NoteSlider() {
    return (
        <div>
            <div className="container-fluid">
                
                <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">

                    <div className="col-3">
                        <div className="card card-block card-1"></div>
                    </div>
                    <div className="col-3">
                        <div className="card card-block card-2"></div>
                    </div>
                    <div className="col-3">
                        <div className="card card-block card-3"></div>
                    </div>
                    <div className="col-3">
                        <div className="card card-block card-4"></div>
                    </div>
                    <div className="col-3">
                        <div className="card card-block card-5"></div>
                    </div>
                    <div className="col-3">
                        <div className="card card-block card-6"></div>
                    </div>
                    <div className="col-3">
                        <div className="card card-block card-7"></div>
                    </div>
                    <div className="col-3">
                        <div className="card card-block card-8"></div>
                    </div>
                    <div className="col-3">
                        <div className="card card-block card-9"></div>
                    </div>
                    <div className="col-3">
                        <div className="card card-block card-10"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteSlider