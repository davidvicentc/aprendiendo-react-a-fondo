import React from 'react';
import Vaper from './components/Vaper.js'
import FormVaper from './components/AddVaper/FormAddVape.js'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vaper: {
        'name': 'Eleaf iStick QC 200w',
        'description': 'mi primer vape'
      },
      vapers: [
        {
          'name': 'Eleaf iStick QC 200w',
          'description': 'mi primer vape'
        },
        {
          'name': 'Vape pen 22',
          'description': 'stick'
        },
        {
          'name': 'v8 stick',
          'description': 'baby trank'
        },
      ]
    };
  }

  render() {
    return (
      <div>
        <FormVaper/>
        <h1>Primer componente</h1>
        {this.state.vapers.map(vaper => <Vaper vaper={vaper}/>)}
      </div>
    );
  }
}

export default App;
