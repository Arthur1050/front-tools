import { useRef, useState, useContext } from 'react'
import './App.css'
import { SystemContext } from './systemContext';

function App() {
  const [system, setSystem] = useContext(SystemContext);
  const [, update] = useState(false)
  const test = useRef<HTMLInputElement>(null)

  const changeConfig = (propertie:string) => {
    setSystem(val => {

      val[propertie] = !val[propertie];

      chrome.storage.local.set(val);

      return val;
    });
    update(i => !i);
  }

  return (
    <>
    <main>
      <div>
        <p>Target</p>
        <label>
          <input type="checkbox" ref={test} checked={test.current?.checked||system.viewTargetSel} onChange={() => changeConfig('viewTargetSel')} />
          <span>Destacar area selecionada</span>
        </label>
        <label>
          <input type="checkbox" checked={system.viewTargetBorderSel} onChange={() => changeConfig('viewTargetBorderSel')} />
          <span>Destacar borda da area selecionada</span>
        </label>
      </div>
    </main>
    </>
  )
}

export default App
