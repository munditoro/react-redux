import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {connect} from 'react-redux';

class App extends Component {

  agregarTarea = (evento)=>{
    if (evento.which === 13) {
      this.props.agregar(evento.target.value, this.props.id);
      evento.target.value = '';
      //console.log(evento.target.value);
    }
  }


  render() {
    const elementosTareas = this.props.tareas.map((tarea)=>{
      return <h2 key={tarea.id}>{tarea.tarea}</h2>
    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.props.informacion}
          <br/>
          <button onClick={this.props.aumentar}>Aumentar</button>  
          <br/>
          <button onClick={this.props.disminuir}>Disminuir</button>
          <br/>
          <input onKeyPress={this.agregarTarea.bind(this)}/>
          <br/>
          {elementosTareas}
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


//Ingresa como props a nuestro component tanto el state como los dispatch

//internamente hace una subscripcion y un get state
//por lo que constantemente en caso de un cambio en el state se actualiza
//o se ejecuta nuevamente
const mapStateToProps = (state)=>{
  return {
    //informacion: state.cantidad,
    informacion: state.numero,
    tareas: state.tareas,
    id: state.id
  }
}


//Es un objeto que asume que las funciones internas son ACTION CREATOR
// y que al ingresarlas a nuestro component las engloba en dispatch para que
//de esta forma puedan ser llamadas como un DISPATCH
/*const mapDispatchToProps = {
  aumentar: ()=>{return{type:'AUM'}},
  disminuir: ()=>{return{type:'DIS'}}
}*/

const mapDispatchToProps = (dispatch)=>{
  return {
    aumentar: ()=>{ dispatch(
      (dispatch)=>{
        setTimeout(()=>{
          return dispatch({type: 'AUM'})
      },3000)
      }
      );},
    //disminuir: ()=> { dispatch({type:'DIS'});},
    disminuir: ()=> {
      setTimeout(()=>{
        dispatch({type:'DIS'});
      },5000) 
    },
    agregar: (tarea,id)=>{dispatch({type:'ADD', tarea,id});}
  }
}
//connect nos permite acceder al state y hacer dispatch de 
//actions y actionscreators
export default connect(mapStateToProps,mapDispatchToProps)(App);
