import React, { memo } from "react"

type OptionType = {
    value: string,
    text: string,
    selected: boolean,
}

type BinaryRadioInputPropsType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
    options: [OptionType, OptionType],
    name: string,
}

const BinaryRadioInput = ({ onChange, options, name }: BinaryRadioInputPropsType) => {
    const [ left, right ] = options

    return (
        <>
            <label>
                <span>{left.text}</span>
                <input type="radio" name={name} value={left.value} onChange={onChange} checked={left.selected} />
            </label>

            <label>
                <span>{right.text}</span>
                <input type="radio" name={name} value={right.value} onChange={onChange} checked={right.selected} />
            </label>
        </>
    )
}

export default memo(BinaryRadioInput)
