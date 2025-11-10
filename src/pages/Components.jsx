import { useState } from "react";

import Value from "../components/Value"
import Timer from "../components/Timer"
import Adder from "../components/Adder"
import Temperatures from "../components/Temperatures"



const Components = () => {
    const [counter, setCounter] = useState(0);
    return(
        <div className="container rounded shadow mt-4 bg-secondary">
        
         <Value name={"Counter"} value={counter} setValue={setCounter} />
      <Adder />

      <Timer />

      <Temperatures />

     
        </div>
    )
}
export default Components;