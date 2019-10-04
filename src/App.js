import React,{Component} from 'react';
import SideBar from './components/Sidebar/Sidebar'
import Appbar from './components/Appbar/Appbar'

export default class App extends Component{
  render(){
  return (
    <div >
      <Appbar/>
      <SideBar/>
    </div>
  )
  }
}

