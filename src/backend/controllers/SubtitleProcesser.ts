import {
    SentenceBlockBySpace, SentenceBlockPart,
    SentenceStruct,
} from '@/common/types/SentenceStruct';
import nlp from "compromise";
import {strBlank} from "@/common/utils/Util";

interface TokenRes {
    word: string;
    implicit: string;
    pos: {
        start: number;
        length: number;
    };
}

function tokenizeAndProcess(text: string): TokenRes[] {
    const doc = nlp(text);
    const offset = doc.out('offset') as {
        terms: {
            text: string;
            implicit: string | undefined;
            offset: {
                start: number;
                length: number;
            }
        }[],
    }[];
    const temp: TokenRes[] = offset.map(e => e.terms ?? [])
        .flat()
        .map((e) => {
            return {
                word: e.text,
                implicit: e.implicit ?? e.text,
                pos: e.offset,
            };
        });
    const res: TokenRes[] = [];
    for (const item of temp) {
        if (item.pos.length > 0) {
            res.push(item);
            continue;
        }
        const last = res.pop();
        // eg: i'm
        // 把last 按照 ' 分割, 第一个分给last, 第二个分给item
        if (!last) {
            continue;
        }
        const strings = last.word.split("'");
        last.word = strings[0];
        last.pos.length = last.word.length;
        item.word = strings[1] + item.word;
        item.pos.start -= strings[0].length;
        item.pos.length += strings[1].length;
        res.push(last);
        res.push(item);
    }
    return res;
}

function isWord(token: string) {
    const noWordRegex = /[^A-Za-z0-9-]/;
    return !noWordRegex.test(token);
}


class SentenceHolder {
    sentence: string;
    index: number;

    constructor(sentence: string) {
        this.sentence = sentence;
        this.index = 0;
    }

    sub(start: number, length: number) {
        this.sentence = this.sentence.substring(start, start + length);
        this.index = start + length;
        return this.sentence;
    }

    subTo(index: number) {
        this.sentence = this.sentence.substring(this.index, index);
        this.index = index;
        return this.sentence;
    }
}

const processSentence = (sentence: string): SentenceStruct => {
    const tokens = tokenizeAndProcess(sentence);
    const holder = new SentenceHolder(sentence);
    const blocks: SentenceBlockBySpace[] = [];
    let blockParts: SentenceBlockPart[] = [];
    for (const token of tokens) {
        const pw = holder.subTo(token.pos.start);
        if (pw.length > 0) {
            if (strBlank(pw)) {
                if (blockParts.length > 0) {
                    blocks.push({blockParts});
                    blockParts = [];
                }
            } else {
                blockParts.push({
                    content: pw,
                    implicit: '',
                    isWord: false,
                });
            }
        }

        const w = holder.sub(token.pos.start, token.pos.length);
        if (!strBlank(w)) {
            blockParts.push({
                content: w,
                implicit: token.implicit,
                isWord: isWord(w),
            });
        }
    }
    if (blockParts.length > 0) {
        blocks.push({blockParts});
    }
    return {
        original: sentence,
        blocks: blocks,
    };
};

const processSentences = (sentences: string[]): SentenceStruct[] => {
    return sentences.map(processSentence);
};
export default processSentences;
