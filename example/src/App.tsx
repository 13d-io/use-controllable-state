import { useState } from 'react';

import ControlledComponent from './ControlledComponent';

const App = () => {
  const [value, setValue] = useState<string>();
  return (
    <div>
      <ControlledComponent id="First" value={value} onChange={setValue} />
      <ControlledComponent id="Second" value={value} onChange={setValue} />
      <ControlledComponent id="Third" value={value} onChange={setValue} />
    </div>
  );
};

export default App;
