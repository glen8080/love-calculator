import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import './app.css'
import Modal from "./Modal/Modal";
import {useFormik} from 'formik'

import * as Yup from 'yup'



function App(){

    
     const [changer ,setChanger] = useState(true)
     const [first ,setFirst] = useState("")
     const [last ,setLast] = useState("")
     const [trigger,setTrigger] = useState(false)
     const [data,setData] = useState("")
     const [loading,setLoading] = useState(false)



     useEffect(()=>{
       
      if(trigger){
         fetchData()
      }
    
        
        
      


     },[trigger])

     const fetchData = () =>{


      const options = {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': '777024f3f1mshfb7fcf26d32c819p158d8cjsn8c0613c1db0b',
            'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
         }
      };
      
      fetch(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${first}&fname=${last}`, options)
         .then(response => response.json())
         .then(response => {
            setData(response)
            setLoading(true)
         
         })
         .catch(err => console.error(err));


     }


     const formik = useFormik({
      initialValues:{
         loversName:"",
         yourName:""
      },
      validationSchema:Yup.object({
          loversName:Yup.string().max(12,"the name should not exceed 12 letters").required("lover's name is required!!!"),
          yourName:Yup.string().max(12,"the name should not exceed 12 letters").required("Your name is required!!!")
      }),
      onSubmit:(values)=>{
         
         setFirst(values.loversName)
         setLast(values.yourName)
         setChanger(!changer)
         setTrigger(!trigger)
      }
     })

   

  
   return(
       <>
         
  { changer ? <div className="container">
         
      <h1 className="love">Love Calculator</h1>
       
       
         <div className="form">
            <div className="formContainer">
             <img src="images/264064.jpg" alt="loveee"  style={{width:170,height:100}}/> 
               <p className="lovely">p<span className="center">p</span>p</p>
            <form  onSubmit={formik.handleSubmit}>
               
                <input name="loversName" type="text" placeholder="your  lover's  name" value={formik.values.loversName} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    {formik.touched.loversName && formik.errors.loversName && <p className="small">{formik.errors.loversName}</p>}
                <input name="yourName" type="text" placeholder="your  name"  value={formik.values.yourName} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    {formik.touched.yourName && formik.errors.yourName && <p className="small">{formik.errors.yourName}</p>}
                 <button className="button" type="submit"><div className="img"><img src="/images/804048.png" alt="logo"/></div>calculate</button>
            </form>
            </div>
         
         </div>
      </div>
     : <Modal loading={loading} loversName={data.fname} yourName={data.sname} percentage={data.percentage} result={data.result} first={first}   />}
      </>
   )
}
ReactDOM.render(<App/>,document.getElementById("root"))
