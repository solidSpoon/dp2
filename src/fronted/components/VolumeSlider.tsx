import React, { useState } from 'react';
import { FaVolumeHigh, FaVolumeLow } from 'react-icons/fa6';
import { FaVolumeMute } from 'react-icons/fa';
import { MySlider } from './MySlider';
import { IoVolumeHigh, IoVolumeLow, IoVolumeMute, IoVolumeOff } from 'react-icons/io5';
import {Slider} from "@/fronted/components/ui/slider";
import {Toggle} from "@/fronted/components/ui/toggle";
import {cn} from "@/fronted/lib/utils";
import {useLocalStorage} from "@uidotdev/usehooks";

export interface VolumeSliderProps {
    volume: number;
    onVolumeChange: (volume: number) => void;
    muted: boolean;
    onMutedChange: (muted: boolean) => void;
}
const VolumeSlider = ({ volume, onVolumeChange, muted, onMutedChange }: VolumeSliderProps) => {
    // const [bkVolume, setBkVolume] = useLocalStorage('volume', 0.5);
    const [localVolume, setLocalVolume] = useState<number>(volume);
    // const[pressed, setPressed] = useState(false);
    return (
        <div className="flex items-center gap-2">
            <Toggle
                size={'sm'}
                pressed={muted}
                onPressedChange={() => {
                    onMutedChange(!muted);
                }}
                className="flex items-center justify-center"
            >
                {/*<IoVolumeOff className="h-6 w-6"/>*/}
                {localVolume > 0.5 && !muted && <IoVolumeHigh className="h-6 w-6"/>}
                {localVolume <= 0.5&& !muted && localVolume > 0 && (
                    <IoVolumeLow className="h-6 w-6"/>
                )}
                {(localVolume === 0 || muted) && <IoVolumeMute className="h-6 w-6"/>}
                <span className={cn('w-7')}>{Math.floor(localVolume * 100)}</span>
            </Toggle>
            <Slider
                className="w-24"
                max={100}
                min={0}
                defaultValue={[volume * 100]}
                onValueCommit={(value) => {
                    onVolumeChange(value[0] / 100);
                    setLocalVolume(value[0] / 100);
                }}
                onValueChange={(value) => {
                    setLocalVolume(value[0] / 100);
                }}
            />
        </div>
    );
};

export default VolumeSlider;
