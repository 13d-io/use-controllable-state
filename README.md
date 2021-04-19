# use-controllable-state

> A React custom hook for managing state in a controlled component.

[![NPM](https://img.shields.io/npm/v/use-controllable-state.svg)](https://www.npmjs.com/package/use-controllable-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-controllable-state
```

## Usage

```tsx
import { FC } from 'react'
import { useControllableState } from 'use-controllable-state';

const Component: FC = (value: string, onChange) => {
  const [internalChanges, internalSetState] = useControllableState<string>(value, onChange);

  const handleClick = () => {
    internalSetState("example of internal change to controlled state");
  };

  return (
    <div>
      <button onClick={handleClick}>Change state internally</button>
      <div>Last internal state change: {internalChanges}</div>
      <div>Controlled state: {value}</div>
    </div>
  );
};
```

## License

MIT © [RichieMillennium](https://github.com/RichieMillennium)
