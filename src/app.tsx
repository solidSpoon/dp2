import {createRoot} from 'react-dom/client';
import React, { useEffect } from 'react';
import useSetting from './frontend/hooks/useSetting';
import FileDrop from "@/frontend/components/FileDrop";
import {HashRouter, Route, Routes} from "react-router-dom";
import HomePage from "@/frontend/pages/HomePage";
import TitleBarLayout from "@/frontend/pages/TieleBarLayout";
import PlayerP from "@/frontend/pages/PlayerP";
import Layout from "@/frontend/pages/Layout";
import About from "@/frontend/pages/About";
import SettingLayout from "@/frontend/pages/setting/SettingLayout";
import ShortcutSetting from "@/frontend/pages/setting/ShortcutSetting";
import YouDaoSetting from "@/frontend/pages/setting/YouDaoSetting";
import TenantSetting from "@/frontend/pages/setting/TenantSetting";
import StorageSetting from "@/frontend/pages/setting/StorageSetting";
import CheckUpdate from "@/frontend/pages/setting/CheckUpdate";
import AppearanceSetting from "@/frontend/pages/setting/AppearanceSetting";
import {Toaster} from "react-hot-toast";

const App = () => {

    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const theme = useSetting((s) => s.values.get('appearance.theme'));
    useEffect(() => {
        document.documentElement.classList.add(theme ?? 'dark');
        return () => {
            document.documentElement.classList.remove(theme ?? 'dark');
        };
    }, [theme]);
    return (
        <FileDrop isDragging={isDragging} setIsDragging={setIsDragging}>
            <>
                <div className='w-full h-screen text-black overflow-hidden select-none font-sans'>
                    <HashRouter>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='home' element={<HomePage />} />
                            <Route element={<TitleBarLayout />}>
                                <Route
                                    path='player/:videoId'
                                    element={<PlayerP />}
                                />
                                <Route path='*' element={<Layout />}>
                                    {/*<Route*/}
                                    {/*    path='word-management'*/}
                                    {/*    element={<WordManagement />}*/}
                                    {/*/>*/}
                                    <Route path='about' element={<About />} />
                                    <Route
                                        path='settings'
                                        element={<SettingLayout />}
                                    >
                                        <Route
                                            path='*'
                                            element={<ShortcutSetting />}
                                        />
                                        <Route
                                            path='shortcut'
                                            element={<ShortcutSetting />}
                                        />
                                        <Route
                                            path='you-dao'
                                            element={<YouDaoSetting />}
                                        />
                                        <Route
                                            path='tenant'
                                            element={<TenantSetting />}
                                        />
                                        <Route
                                            path='storage'
                                            element={<StorageSetting />}
                                        />
                                        <Route
                                            path='update'
                                            element={<CheckUpdate />}
                                        />
                                        <Route
                                            path='appearance'
                                            element={<AppearanceSetting />}
                                        />
                                    </Route>
                                </Route>
                            </Route>
                        </Routes>
                    </HashRouter>
                </div>
                <Toaster />
            </>
        </FileDrop>
    );
}

const root = createRoot(document.body);
root.render(<App/>);