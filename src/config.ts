export interface ConfigType {
    option: string;
    description: string;
    defaultValue?: string | boolean;
    usage: string;
}

const config: ConfigType[] = [
    {
        option: '-p, --path <n>',
        description: '指定目录路径',
        defaultValue: false,
        usage: '-p  D:\\demo'
    },
    {
        option: '-act, --action <n>',
        description: '操作行为：目前支持删除（del）与提取（ext）',
        defaultValue: false,
        usage: '-act delete'
    },
    {
        option: '-fl, --filter <n>',
        description: '筛选条件',
        defaultValue: false,
        usage: '-fl .mp4'
    },
    {
        option: '-m, --match <n>',
        description: '匹配模式：incl（包含） equal（全等） reg（正则）',
        defaultValue: 'incl',
        usage: '-m &&'
    },
    {
        option: '-tt, --targetType <n>',
        description: '操作目标类型，默认文件类型（file），可选目录类型（dir）',
        defaultValue: 'file',
        usage: '-tt dir'
    },
]

export default config;