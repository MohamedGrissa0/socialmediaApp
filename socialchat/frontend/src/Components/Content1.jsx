import React from 'react';
import Sidebar1 from './Sidebar1';
import Center1 from './Center1';
import RightBar from './RightBar';
import Messagner from './Messagner';
import { useVisibility } from '../VisibilityContext';

export default function Content1() {
  const { open, setOpen } = useVisibility();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-${open ? '5' : '4'} `}>
        <Sidebar1 />
        <Center1 />
        <RightBar />
        {open && <Messagner />}
    </div>
  );
}
