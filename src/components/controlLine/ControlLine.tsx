import { useState } from 'react';
import store from '../../store';

const ControlLine = () => {
  const [productText,setProductText]=useState("")
return <div>
       <input value={productText} onChange={(e)=>setProductText(e.target.value)} type="text"></input>
       <button onClick={()=>store.addProduct(productText)}>add</button>
     
      <select>sort by</select>
      </div>
  };
  export default ControlLine;