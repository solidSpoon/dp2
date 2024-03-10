import React, {useEffect, useRef, useState} from 'react';
import {cn} from '@/common/utils/Util';
import {Popover, PopoverContent, PopoverTrigger} from "@/fronted/components/ui/popover";
import {Button} from "@/fronted/components/ui/button";
import {Label} from "@/fronted/components/ui/label";
import {Input} from "@/fronted/components/ui/input";

export interface VolumeSliderProps {
    speed: number;
    onSpeedChange: (speed: number) => void;
}

const SpeedSlider = ({speed, onSpeedChange}: VolumeSliderProps) => {
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);
    const pageSelectItem = (num: number) => {
        return (
            <div
                onClick={() => {
                    setOpen(false);
                    onSpeedChange(num);
                }}
                className={cn(
                    'flex flex-row w-full items-center justify-start px-8 py-1.5 rounded text-sm',
                    'cursor-pointer',
                    speed === num ? 'bg-primary' : ''
                )}
            >
                {num}
            </div>
        );
    };
    // return (
    //     <>
    //         <div
    //             ref={refs.setReference}
    //             className=''
    //             {...getReferenceProps()}
    //         >
    //             <Toggle
    //                 pressed={open}
    //                 size={'sm'}
    //                 onPressedChange={() => {
    //                     setOpen(!open);
    //                 }}>
    //                 {/*// className={cn('bg-white/90 rounded text-neutral-500 font-bold grid place-content-center px-2')}>*/}
    //                 <span>{speed.toFixed(2)}x</span>
    //             </Toggle>
    //         </div>
    //         {open && (
    //             <div
    //                 ref={refs.setFloating}
    //                 style={floatingStyles}
    //                 className={cn(
    //                     'z-50 pointer-events-none'
    //                 )}
    //             >
    //                 <div
    //                     className={cn(
    //                         'w-36 bg-popover border-neutral-600 border-[0.5px] rounded flex flex-col p-1 translate-x-10 pointer-events-auto'
    //                     )}
    //                 >
    //                     {pageSelectItem(0.25)}
    //                     {pageSelectItem(0.5)}
    //                     {pageSelectItem(0.75)}
    //                     {pageSelectItem(1)}
    //                     {pageSelectItem(1.25)}
    //                     {pageSelectItem(1.5)}
    //                     {pageSelectItem(1.75)}
    //                     {pageSelectItem(2)}
    //                     <input
    //                         ref={inputRef}
    //                         defaultValue={speed}
    //                         type={'number'}
    //                         min={0.25} // 最小速度
    //                         max={16} // 最大速度
    //                         step={0.25} // 步进值
    //                         className={cn('w-full bg-neutral-700 rounded border-neutral-600 border-[0.5px] text-white p-1 focus:outline-none mt-1')}
    //                         onKeyDown={(e) => {
    //                             if (e.key === 'Enter') {
    //                                 setOpen(false);
    //                                 let s = parseFloat(parseFloat(e.currentTarget.value).toFixed(2));
    //                                 if(s > 20) {
    //                                     s = 20;
    //                                 }
    //                                 if(s < 0.25) {
    //                                     s = 0.25;
    //                                 }
    //                                 onSpeedChange(s);
    //                             }
    //                         }}
    //                         onChange={(e) => {
    //                             console.log('onChange', e.currentTarget.value);
    //                             let s = parseFloat(parseFloat(e.currentTarget.value).toFixed(2));
    //                             if(s > 20) {
    //                                 s = 20;
    //                             }
    //                             if(s < 0.25) {
    //                                 s = 0.25;
    //                             }
    //                             onSpeedChange(s);
    //                         }}
    //                     />
    //                 </div>
    //             </div>
    //         )}
    //     </>
    // );

    return (
        <Popover open={open}
                 onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    size={"sm"} variant="outline"><span className={cn('w-12')}>{speed.toFixed(2)}x</span></Button>
            </PopoverTrigger>
            <PopoverContent
                side={'top'} align={'start'}
                className="w-40 flex flex-col p-1">

                {pageSelectItem(0.25)}
                {pageSelectItem(0.5)}
                {pageSelectItem(0.75)}
                {pageSelectItem(1)}
                {pageSelectItem(1.25)}
                {pageSelectItem(1.5)}
                {pageSelectItem(1.75)}
                {pageSelectItem(2)}
                <div className={cn('p-1')}>
                    <Input
                        size={100}
                        ref={inputRef}
                        defaultValue={speed}
                        type={'number'}
                        min={0.25} // 最小速度
                        max={16} // 最大速度
                        step={0.25} // 步进值
                        className={cn('bg-secondary')}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setOpen(false);
                                let s = parseFloat(parseFloat(e.currentTarget.value).toFixed(2));
                                if (s > 20) {
                                    s = 20;
                                }
                                if (s < 0.25) {
                                    s = 0.25;
                                }
                                onSpeedChange(s);
                            }
                        }}
                        onChange={(e) => {
                            console.log('onChange', e.currentTarget.value);
                            let s = parseFloat(parseFloat(e.currentTarget.value).toFixed(2));
                            if (s > 20) {
                                s = 20;
                            }
                            if (s < 0.25) {
                                s = 0.25;
                            }
                            onSpeedChange(s);
                        }}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
};

export default SpeedSlider;
