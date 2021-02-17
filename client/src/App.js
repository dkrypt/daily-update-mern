import './App.css';
import DisplayArea from './components/DisplayArea';
import InputArea from './components/InputArea';
import model from './model';
import {createStore, StoreProvider } from 'easy-peasy';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

const store = createStore(model);

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <ReactNotification />
        <div className="title">Did That</div>
        <div className="canvas">
          <InputArea />
          <DisplayArea />
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
