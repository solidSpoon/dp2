import React from 'react';
import {twMerge} from 'tailwind-merge';
import {useNavigate} from 'react-router-dom';
import {VscFolderOpened, VscHistory} from 'react-icons/vsc';
import {IoRefreshCircleOutline} from 'react-icons/io5';
import FileSelector from './fileBowser/FileSelector';
import useProjectBrowser from '../hooks/useProjectBrowser';
import FileItem from './fileBowser/FileItem';
import {cn} from '@/common/utils/Util';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/fronted/components/ui/card";
import {Button} from "@/fronted/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbSeparator
} from "@/fronted/components/ui/breadcrumb";
import FileSelector2 from "@/fronted/components/fileBowser/FileSelector2";

const FileBrowser = () => {
    const navigate = useNavigate();
    const {list, refresh, loading, path, routeTo} = useProjectBrowser(
        'route',
        (videoId) => navigate(`/player/${videoId}`)
    );
    console.log('list', list);
    return (
        <Card
            onClick={(e) => {
                e.stopPropagation();
            }}
            // className={twMerge(
            //     'flex-1 flex flex-col gap-2 items-center justify-center p-5 xl:p-10 rounded-lg w-full h-full text-black',
            //     'bg-white/90 drop-shadow-lg'
            // )}
            className={cn("h-full w-full flex flex-col")}
        >
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent className={cn('h-0 flex-1 w-full flex flex-col gap-2')}>
                <div
                    className={cn('justify-self-end flex mb-10 flex-wrap w-full justify-center items-center gap-2 min-h-20 rounded border border-dashed p-2')}
                >
                    <FileSelector2
                        directory={false}
                        onSelected={refresh}
                    />
                    <FileSelector2
                        directory={true}
                        onSelected={refresh}
                    />
                    {/*<FileSelector */}
                    {/*    */}
                    {/*    ref={folderRef}*/}
                    {/*    className={cn("hidden")} directory onSelected={refresh}/>*/}
                </div>
                <Breadcrumb>
                    <BreadcrumbList>
                        {/* ... */}
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            <BreadcrumbSeparator/>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            <BreadcrumbSeparator/>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>

                        </BreadcrumbItem>
                        {/* ... */}
                    </BreadcrumbList>
                </Breadcrumb>
                {/*<div className={cn('w-full flex items-center gap-2')}>*/}
                {/*    {path ? (*/}
                {/*        <VscFolderOpened className="flex-shrink-0 w-4 h-4"/>*/}
                {/*    ) : (*/}
                {/*        <VscHistory className="flex-shrink-0 w-4 h-4"/>*/}
                {/*    )}*/}
                {/*    <div className={cn('flex-1 truncate text-lg')}>*/}
                {/*        {path ?? '最近播放'}*/}
                {/*    </div>*/}
                {/*    <div*/}
                {/*        onClick={() => {*/}
                {/*            if (!loading) {*/}
                {/*                refresh();*/}
                {/*            }*/}
                {/*        }}*/}
                {/*        className={cn(*/}
                {/*            'ml-auto w-8 h-8 rounded hover:bg-gray-200 p-1 grid place-content-center'*/}
                {/*        )}*/}
                {/*    >*/}
                {/*        <IoRefreshCircleOutline*/}
                {/*            className={cn(*/}
                {/*                'w-5 h-5 flex-shrink-0 ',*/}
                {/*                loading && 'animate-spin'*/}
                {/*            )}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<FileItem*/}
                {/*    key="back"*/}
                {/*    onClick={() => routeTo(null)}*/}
                {/*    content={path ? '..' : '.'}*/}
                {/*/>*/}
                <div
                    className={cn(
                        'w-full h-0 flex-1 overflow-y-auto scrollbar-none'
                    )}
                >
                    {list.map((item) => {
                        return (
                            <FileItem
                                className={cn(
                                    'text-sm',
                                    item.playing === 'playing'
                                        ? 'bg-orange-200 hover:bg-orange-200/50'
                                        : ''
                                )}
                                key={item.key}
                                icon={item.icon}
                                onClick={item.callback}
                                content={item.name}
                            />
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default FileBrowser;
