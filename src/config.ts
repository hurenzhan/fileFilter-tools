export interface ConfigValueType {
    option: string;
    description: string;
    defaultValue?: string;
    usage: string;
}


export enum OPTION_TYPE_KEY {
    DELETE = 'del',
    EXTRACT = 'ext',
    INCLUDES = 'incl',
    EQUAL = 'equal',
    REG = 'reg',
    FILE = 'file',
    DIRECTORY = 'dir',
}

export const optionTypeName: { [key: string]: string } = {
    [OPTION_TYPE_KEY.DELETE]: '删除',
    [OPTION_TYPE_KEY.EXTRACT]: '提取',
    [OPTION_TYPE_KEY.INCLUDES]: '包含',
    [OPTION_TYPE_KEY.EQUAL]: '全等',
    [OPTION_TYPE_KEY.REG]: '正则',
    [OPTION_TYPE_KEY.FILE]: '文件',
    [OPTION_TYPE_KEY.DIRECTORY]: '目录',
}

export const optionConfig: ConfigValueType[] = [
    {
        option: '-p, --path <n>',
        description: '指定目录路径',
        defaultValue: undefined,
        usage: '-p  D:\\demo'
    },
    {
        option: '-act, --action <n>',
        description: `操作行为：目前支持${optionTypeName[OPTION_TYPE_KEY.DELETE]}（${OPTION_TYPE_KEY.DELETE}）与${optionTypeName[OPTION_TYPE_KEY.EXTRACT]}（${OPTION_TYPE_KEY.EXTRACT}）`,
        defaultValue: undefined,
        usage: `-act ${OPTION_TYPE_KEY.DELETE}`
    },
    {
        option: '-fl, --filter <n>',
        description: '筛选条件',
        defaultValue: undefined,
        usage: '-fl .mp4'
    },
    {
        option: '-m, --match <n>',
        description: `匹配模式：${OPTION_TYPE_KEY.INCLUDES}（${optionTypeName[OPTION_TYPE_KEY.INCLUDES]}） ${OPTION_TYPE_KEY.EQUAL}（${optionTypeName[OPTION_TYPE_KEY.EQUAL]}） ${OPTION_TYPE_KEY.REG}（${optionTypeName[OPTION_TYPE_KEY.REG]}）`,
        defaultValue: OPTION_TYPE_KEY.INCLUDES,
        usage: `-m ${OPTION_TYPE_KEY.INCLUDES}`
    },
    {
        option: '-tt, --targetType <n>',
        description: `操作目标类型：默认${OPTION_TYPE_KEY.FILE}（${optionTypeName[OPTION_TYPE_KEY.FILE]}），可选dir（${optionTypeName[OPTION_TYPE_KEY.DIRECTORY]}）类型`,
        defaultValue: 'file',
        usage: `-tt ${OPTION_TYPE_KEY.DIRECTORY}`
    },
]

export interface PromptValueType {
    name: string;
    value: string;
}

export const promptConfigs: PromptValueType[] = [
    {
        name: '目录路径',
        value: 'path',
    },
    {
        name: '操作',
        value: 'action',
    },
    {
        name: '筛选条件',
        value: 'filter',
    },
    {
        name: '匹配模式',
        value: 'match',
    },
    {
        name: '操作目标类型',
        value: 'targetType',
    },
]

export interface promptIconsType {
    0: string;
    1: string;
}

export const promptIcons: promptIconsType = {
    0: '[ ]',
    1: '[■]',
}
