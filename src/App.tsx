import { useState, useContext } from 'react'
import {PowerOff, MousePointerSquare, RectangleVertical, MousePointer} from 'lucide-react';
import './App.css'
import { SystemContext } from './systemContext';
import { TitleSectin } from './components/atoms/TitleSection/style';
import InputMoveType from './components/molecules/InputMoveType/InputMoveType';
import CheckBox from './components/atoms/CheckBox/CheckBox';

function App() {
  const [system, setSystem] = useContext(SystemContext);
  const [, update] = useState(false)
  // const test = useRef<HTMLInputElement>(null)

  const changeConfig = (propertie:string, opt:null|number = null) => {
    setSystem(val => {

      val[propertie] = opt || !val[propertie];

      chrome.storage?.local.set(val);

      return val;
    });
    update(i => !i);
  }

  return (
    <>
    <main>
      <img style={{width: '70%', marginInline: 'auto', marginBlock: '16px', marginBottom: '24px'}} src="/frontools-logo/png/logo-no-background.png" alt="logo.png" />
      <div>
        <div>
          <TitleSectin>Tipo de movimentação</TitleSectin>
          <div style={{display: 'flex', justifyContent: 'center', gap:'20px'}}>
            <InputMoveType label='OFF' name='moveType' onclick={() => changeConfig('moveType', 0)} selected={!system.moveType}>
              <PowerOff />
            </InputMoveType>
            <InputMoveType label='Target' name='moveType' onclick={() => changeConfig('moveType', 1)} selected={system.moveType == 1}>
              <div>
                <MousePointerSquare />
                <RectangleVertical size={20} style={{marginBottom: '-5px', marginLeft: '-2px'}} />
              </div>
            </InputMoveType>
            <InputMoveType label='Cursor' name='moveType' onclick={() => changeConfig('moveType', 2)} selected={system.moveType == 2}>
              <div>
                <MousePointer size={14} />
                <RectangleVertical style={{marginBottom: '-10px', marginLeft: '-2px'}} />
              </div>
            </InputMoveType>
          </div>
        </div>
        <div style={{marginTop: '1rem'}}>
          <TitleSectin>Target</TitleSectin>
          <CheckBox label='Destacar area selecionada' onchange={() => changeConfig('viewTargetSel')} selected={system.viewTargetSel}/>
          <CheckBox label='Destacar borda da area selecionada' onchange={() => changeConfig('viewTargetBorderSel')} selected={system.viewTargetBorderSel}/>
        </div>
      </div>
    </main>
    </>
  )
}

export default App
