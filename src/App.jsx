import React from 'react';
import AddContact from './pages/AddContact';
import ListContact from './components/ListContact';
import { DataContextProvider } from './store/context';

class App extends React.Component {
  render() {
    return (
      <div className="mx-auto w-11/12">
        <div className="mt-12">
          {/* form input */}
          <div className='w-full'>
            <DataContextProvider>
              <AddContact />
              <div className='mt-8'>
                <ListContact />
              </div>
            </DataContextProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
