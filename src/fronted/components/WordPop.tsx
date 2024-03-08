import React from 'react';
import {
    autoPlacement,
    offset,
    useFloating,
    useInteractions,
} from '@floating-ui/react';
import { AiOutlineSound } from 'react-icons/ai';
import { YdRes } from '@/common/types/YdRes';
import { playUrl } from '@/common/utils/AudioPlayer';
import { cn } from '@/common/utils/Util';

export interface WordSubParam {
    word: string;
    translation: YdRes | undefined;
}

const WordPop = React.forwardRef(
    (
        { word, translation }: WordSubParam,
        ref: React.ForwardedRef<HTMLDivElement | null>
    ) => {
        console.log('popper', translation);

        const { refs, floatingStyles, context } = useFloating({
            middleware: [
                // autoPlacement({ allowedPlacements: ['bottom'] }),
                offset(50),
                autoPlacement({
                    allowedPlacements: [
                        'top',
                        'bottom',
                        'top-start',
                        'top-end',
                        'bottom-start',
                        'bottom-end',
                    ],
                }),
            ],
        });

        const { getReferenceProps, getFloatingProps } = useInteractions([]);

        const play = async (type: 'us' | 'uk') => {
            if (!translation?.basic) {
                return;
            }
            const field = type === 'us' ? 'us-speech' : 'uk-speech';
            const url = translation?.basic[field];
            await playUrl(url);
        };

        const popper = () => {
            if (!translation) {
                return <div className="text-2xl">loading</div>;
            }
            const { basic } = translation;
            console.log('aaaa', translation.query);
            return (
                <div
                    className={cn(
                        'select-text relative top-0 left-0 max-w-sm max-h-96 overflow-y-auto flex flex-col items-start  bg-gray-200 text-gray-900 shadow-inner shadow-gray-100 drop-shadow-2xl rounded-2xl px-4 scrollbar-none',
                        basic && 'pt-4'
                    )}
                >
                    {basic && (
                        <>
                            <div className="text-2xl mb-2 flex justify-start items-center gap-4">
                                {translation.query}
                                <div>{translation.translation}</div>
                            </div>
                            <div className="pl-2 text-base flex justify-start items-center gap-2">
                                {`美 [${basic['us-phonetic'] || ''}]`}
                                <AiOutlineSound
                                    onClick={() => play('us')}
                                    className="cursor-pointer hover:text-gray-400 text-2xl"
                                />
                            </div>
                            <div className="pl-2 text-base flex justify-start items-start gap-2">
                                {`英 [${basic['uk-phonetic'] ?? ''}]`}
                                <AiOutlineSound
                                    onClick={() => play('uk')}
                                    className="cursor-pointer hover:text-gray-400 text-2xl"
                                />
                            </div>
                            <div className="text-base mt-2 flex flex-col gap-2 items-start w-full">
                                {basic.explains.map((e) => {
                                    return (
                                        <div className="p-2 rounded text-left w-full bg-gray-300/25">
                                            {e}
                                        </div>
                                    );
                                })}
                            </div>
                            {basic.exam_type && (
                                <>
                                    <div className="text-sm text-gray-400 mt-2 mb-1">
                                        标签
                                    </div>
                                    <div className="text-sm">
                                        {basic.exam_type.join('/')}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <div className="sticky bottom-0 text-cyan-900 text-lg text-center bg-gray-200/95 w-full pt-1 mt-1 pb-2">
                        {translation.translation}
                    </div>
                </div>
            );
        };

        return (
            <>
                <div
                    ref={refs.setReference}
                    className="rounded select-none bg-wordHoverBackground z-50 focus:outline-none"
                    role="button"
                    tabIndex={0}
                    {...getReferenceProps()}
                >
                    {word}
                </div>

                <div
                    {...getFloatingProps()}
                    ref={refs.setFloating}
                    style={floatingStyles}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="z-50" ref={ref}>
                        {popper()}
                    </div>
                </div>
            </>
        );
    }
);

export default WordPop;
