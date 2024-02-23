import { useEffect, useState } from 'react';
import Header from '@/frontend/components/setting/Header';
import ItemWrapper from '@/frontend/components/setting/ItemWrapper';
import FooterWrapper from '@/frontend/components/setting/FooterWrapper';
import SettingButton from '@/frontend/components/setting/SettingButton';

const api = window.electron;
const StorageSetting = () => {
    const [size, setSize] = useState<string>('0 KB');

    useEffect(() => {
        const init = async () => {
            const s = await api.queryCacheSize();
            setSize(s);
        };
        init();
    }, []);

    const handleClear = async () => {
        await api.clearCache();
        const s = await api.queryCacheSize();
        setSize(s);
    };

    const handleOpen = async () => {
        await api.openDataFolder();
    };

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <Header
                title="存储"
                description={
                    <span>
                        DashPlayer 会缓存翻译结果，以降低 API 调用成本。
                        <br />
                        缓存文件由数据库软件维护，请不要编辑缓存文件。
                    </span>
                }
            />
            <ItemWrapper>
                <div className="mt-4 flex text-lg flex-row items-center gap-2">
                    <text>占用空间</text>
                    <text>{size}</text>
                </div>
            </ItemWrapper>
            <FooterWrapper>
                <SettingButton
                    kind="secondary"
                    disabled
                    handleSubmit={handleClear}
                >
                    清除一个月前的缓存
                </SettingButton>
                <SettingButton handleSubmit={handleOpen}>
                    打开缓存文件夹
                </SettingButton>
            </FooterWrapper>
        </div>
    );
};
export default StorageSetting;
