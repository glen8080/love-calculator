import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ReactLoading from 'react-loading';


function Modal(props) {


 const refresher = () =>{
  window.location.reload(false)
 }   
  return (
    <div>
        <div className="modal_container">
       { props.loading ?    <div className="form_container">
                <div className="upper">
                    <div className="empty"></div>
                   {/* <button className='close' onClick={props.setChanger} ></button>*/}
                    <CloseIcon className='close'  onClick={refresher}/>
                </div>
                <div className="middle">
                    <p className="percentage">{props.percentage}%</p>
                </div>
                <div className="lower">
                  <p className="answer">" {props.result}  "</p>
                </div>

            </div> : <ReactLoading type={"spin"} color={"white"} height={100} width={100} />}
        </div>
    </div>
  )
}

export default Modal