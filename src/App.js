import React ,{useReducer,useEffect,useRef}from "react";
import "./style.css";
const reducer=(state,action)=>{
  switch(action.type){
    case 'start':
      return {...state,isRunning:true}
      break;
    case 'tick':
      return {...state,count:state.count+1}
      break;
    case 'stop':
      return {...state,isRunning:false}
      break;
    case 'reset':
      return {...state,count:state.count=0,isRunning:false}
      break;
    default:
  }
}
export default function App() {

const [count,dispatch]=useReducer(reducer,{isRunning:false,count:0})
const idRef=useRef(0)
useEffect(()=>{
  if(!count.isRunning){
    return ;
  }
  idRef.current=setInterval(()=>{dispatch({type:'tick'},)},1000);
  return () => {
    clearInterval(idRef.current);
    idRef.current = 0;
  };
},[count.isRunning])
  return (
    <>
    <h1>Counts:--{count.count}--</h1>
    <button onClick={()=>{dispatch({type:'start'})}}>
      start
    </button>
    <button onClick={()=>{dispatch({type:'stop'})}}>
      stop
    </button>
    <button onClick={()=>{dispatch({type:'reset'})}}>
      reset
    </button>
    </>
  );
}
