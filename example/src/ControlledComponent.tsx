import { FC, CSSProperties, ChangeEvent } from 'react';

import { useControllableState } from 'use-controllable-state';

const divStyle: CSSProperties = {
  margin: 8
};

interface ComponentType {
  id: string;
  value?: string;
  onChange: (newValue?: string) => void;
}

const ControlledComponent: FC<ComponentType> = ({ id, value, onChange }) => {
  const [, setInternalValue] = useControllableState<string | undefined>(
    value,
    onChange
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setInternalValue(event.target.value);
  };

  return (
    <div style={{ padding: 8, marginBottom: 32, backgroundColor: '#EEEEEE' }}>
      <div style={divStyle}>
        <label htmlFor={id}>{id}</label>
      </div>
      <div style={divStyle}>
        <select
          id={id}
          value={value}
          onChange={handleChange}
          style={{ width: 500 }}
        >
          <option />
          <option value="optA">Angel</option>
          <option value="optB">Beetle</option>
          <option value="optC">Cardinal</option>
          <option value="optD">Destiny</option>
          <option value="optE">Egg</option>
        </select>
      </div>
    </div>
  );
};

export default ControlledComponent;
