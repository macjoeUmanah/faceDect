import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm=({changeOn,onSubmit})=>{


	return(

       <div>

         <p className="f3">{'This App will help you detect faces in your images'}</p>

           <div className="center">

             <div className="form center pa4 shadow-5 br3">

             <input className="pa2 f4 w-70 center" type="text" onChange={changeOn} />

             <button onClick={onSubmit} className="w-30 grow f4 link ph3 pv2 dib bg-light white">Detect</button>

             </div>

           </div>


       </div>



	)
}

export default ImageLinkForm;