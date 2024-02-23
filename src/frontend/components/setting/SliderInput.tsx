import { useEffect, useState } from 'react';
import { Slider } from '../Slider';
import { cn } from '../../../common/utils/Util';

export interface SliderInputProps {
    title: string;
    values: string[];
    defaultValue: string;
    setValue: (value: string) => void;
    inputWidth?: string;
}
const SliderInput = ({
    title,
    values,
    defaultValue,
    setValue,
    inputWidth,
}: SliderInputProps) => {
    const [localValue, setLocalValue] = useState<string>(defaultValue);
    useEffect(() => {
        setLocalValue(defaultValue);
    }, [defaultValue]);
    return (
        <div className="flex items-center gap-4  text-gray-700 select-none">
            <div className="text-right w-28">{title} :</div>
            <Slider
                sliderClassName="bg-stone-300"
                className={cn('border rounded', inputWidth)}
                max={values.length - 1}
                min={0}
                value={[values.indexOf(localValue)]}
                onValueChange={(value) => {
                    setLocalValue(values[value[0]]);
                }}
                onValueCommit={(value) => {
                    setValue(values[value[0]]);
                }}
            />
            <div className="text-sm text-left w-10">{localValue}</div>
        </div>
    );
};

SliderInput.defaultProps = {
    inputWidth: 'w-44',
};
export default SliderInput;
