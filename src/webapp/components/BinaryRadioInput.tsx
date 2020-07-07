/** @jsx jsx */
import React, { memo } from 'react';
import {
  jsx, Label, Radio, Flex,
} from 'theme-ui';

// Generic component for all binary radio button options
// React.memo stands for memoize (this will make this functional component a pure component)

type OptionType = {
  value: string,
  text: string,
  selected: boolean,
};

type BinaryRadioInputPropsType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
  options: [OptionType, OptionType],
  name: string,
};

const BinaryRadioInput = ({ onChange, options, name }: BinaryRadioInputPropsType) => {
  const [left, right] = options;

  return (
    <Flex sx={{ maxWidth: '50em' }}>
      <Label>
        <Radio name={name} value={left.value} onChange={onChange} checked={left.selected} />
        {left.text}
      </Label>

      <Label>
        <Radio name={name} value={right.value} onChange={onChange} checked={right.selected} />
        {right.text}
      </Label>
    </Flex>
  );
};

export default memo(BinaryRadioInput);
