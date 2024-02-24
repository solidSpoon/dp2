import React, { ReactElement, useState } from 'react';
import { AiOutlineFieldTime } from 'react-icons/ai';
import hash from '../../common/utils/hash';
import Word from './Word';
import usePlayerController from '../hooks/usePlayerController';
import useSetting from '../hooks/useSetting';
import { cn, p } from '@/common/utils/Util';
import { FONT_SIZE } from '../styles/style';
import IconButton from './toolTip/IconButton';

interface TranslatableSubtitleLineParam {
    text: string;
    adjusted: boolean;
    clearAdjust: () => void;
}

const notWord = (str: string, key: string, showE: boolean): ReactElement => {
    return (
        <div
            className={`select-none ${showE ? '' : 'text-transparent'}`}
            key={key}
        >
            {str}
        </div>
    );
};
const TranslatableLine = ({
    text,
    adjusted,
    clearAdjust,
}: TranslatableSubtitleLineParam) => {
    const fontSize = useSetting((state) =>
        state.values.get('appearance.fontSize')
    );
    const show = usePlayerController((state) => state.showEn);
    const sentenceStruct = usePlayerController((state) =>
        state.subTitlesStructure.get(p(text))
    );
    console.log('sentenceStruct', sentenceStruct);
    console.log('TranslatableLine', text, 'dd');
    const [popELe, setPopEle] = useState<string | null>(null);
    const [hovered, setHovered] = useState(false);
    const textHash = hash(text);
    const handleRequestPop = (k: string) => {
        if (popELe !== k) {
            setPopEle(k);
        }
    };

    return text === undefined ? (
        <div />
    ) : (
        <div
            onMouseOver={() => {
                setHovered(true);
            }}
            onMouseLeave={() => {
                setHovered(false);
            }}
            className={cn(
                'flex justify-between items-start rounded-lg drop-shadow-md text-mainSubtitleOneColor mx-10 mt-2.5 shadow-inner shadow-sentenceInnerShadow z-50',
                'bg-sentenceBackground',
                FONT_SIZE["ms1-large"],
                fontSize === 'fontSizeSmall' && FONT_SIZE["ms1-small"],
                fontSize === 'fontSizeMedium' &&
                FONT_SIZE["ms1-medium"],
                fontSize === 'fontSizeLarge' && FONT_SIZE["ms1-large"]
            )}
        >
            <div className={cn('w-10 h-full p-2.5')}>
                {adjusted && (
                    <IconButton
                        onClick={clearAdjust}
                        tooltip="点击重置当前句子时间戳"
                    >
                        <AiOutlineFieldTime
                            className={cn('w-8 h-8 text-white')}
                        />
                    </IconButton>
                )}
            </div>
            <div
                className={cn(
                    'flex flex-wrap justify-center items-end w-0 flex-1 px-10 pt-2.5 pb-2.5 gap-x-2 gap-y-1'
                )}
            >
                {sentenceStruct?.blocks.map((block, blockIndex) => {
                    return (
                        <div className={cn('flex items-end')}>
                            {block.blockParts.map((part, partIndex) => {
                                const partId = `${textHash}:${blockIndex}:${partIndex}`;
                                if (part.isWord) {
                                    return (
                                        <Word
                                            key={partId}
                                            word={part.content}
                                            pop={popELe === partId}
                                            requestPop={() =>
                                                handleRequestPop(partId)
                                            }
                                            show={show || hovered}
                                        />
                                    );
                                }
                                return notWord(
                                    part.content,
                                    partId,
                                    show || hovered
                                );
                            })}
                        </div>
                    );
                }) || []}
            </div>
            <div className={cn('w-10 h-full')} />
        </div>
    );
};

export default TranslatableLine;
