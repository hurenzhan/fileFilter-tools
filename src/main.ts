import {OptionValues} from "commander";
import {OPTION_TYPE_KEY, optionTypeName, promptConfigs, promptIcons} from "./config";

const inquirer = require('inquirer');
import {stat, statSync} from 'fs';
import {red, green, yellow} from 'chalk';

interface ActionMapType {
    [key: string]: Function;
}

const promptInfo = {
    run: {name: '执行', value: '1'},
    quit: {name: '退出', value: '0'},
}

class MainHandle {
    config: OptionValues;
    private lackConditions: string[];
    private readonly actionMap: ActionMapType;
    private isErrorPath: Boolean;

    constructor(config: OptionValues) {
        this.config = config;
        this.lackConditions = Object.entries(config).filter(([key, value]) => value).map(item => item[0]);  // 未传的参数列表
        // 操作映射，根据选项展示对应的参数配置列表
        this.actionMap = {
            path: this.pathAction,
            action: this.operateAction,
            filter: this.filterAction,
            match: this.matchAction,
            targetType: this.targetTypeAction,
        }
        this.isErrorPath = false;
        const path: string = this.config.path;
        // 如果有路径，要先校验是否正确，错误让用户重新输入
        if (path) {
            const passed = this.handleCheckPath(path);
            if (!passed) {
                this.isErrorPath = true;
                this.pathAction();
            }
            if (passed) {
                // 参数不完整，展示操作列表
                if (this.lackConditions.length) this.showPrompt();
            }
        } else {
            this.showPrompt();
        }
    }

    // 如果缺少参数据，弹出配置参数列表设定
    private showPrompt() {
        //  处理列表名称，添加注释
        const getConfigName = (value: string) => {
            const typeName = optionTypeName[value];
            return green(typeName ? `${value}（${typeName}）` : value);
        }
        inquirer.prompt({
            type: 'list',
            name: 'index',
            message: yellow('请配置参数：'),
            choices: [
                ...promptConfigs.map((item) => {
                    const configValue = this.config[item.value];
                    return {
                        name: `${promptIcons[configValue ? 1 : 0]} - ${item.name}${configValue ? `: ${getConfigName(configValue)}` : ''}`,
                        value: item.value
                    }
                }),
                ...Object.values(promptInfo)
            ]
        }).then((answer: { index: string }) => {
            this.actionMap[answer.index]?.();
        })
    }

    // 更新配置并渲染列表
    private updateConfigList(answer: { [key: string]: string }) {
        const [key, value] = Object.entries(answer)?.[0];
        if (value !== '0') this.config[key] = value;
        this.showPrompt();
    }

    // 校验路径是否正确
    private handleCheckPath = (path: string) => {
        const sendError = () => {   //  让用户重新输入
            this.isErrorPath = true;
            this.config.path = path;
            return false;
        }
        // 不是文件夹或者路径错误，直接让用户重新输入
        try {
            const stat = statSync(path);
            if (!stat.isDirectory()) return sendError();
            this.isErrorPath = false;
            return true;
        } catch {
            return sendError();
        }
    }

    // 路径配置
    private pathAction = () => {
        inquirer.prompt({
            type: 'input',
            message: this.isErrorPath ? red('不是有效目录路径，请重新输入：') : yellow('请输入文件夹路径：'),
            name: 'path',
            default: this.isErrorPath ? red(this.config.path) : this.config.path,
            validate: (path: string) => {
                const passed = this.handleCheckPath(path);
                if (passed) return true;
                return red('不是有效的目录路径，请重新输入');
            }
        }).then((answer: { path: string }) => {
            this.updateConfigList(answer);
        })
    }

    // 操作配置
    private operateAction = () => {
        inquirer.prompt({
            type: 'list',
            name: 'action',
            message: yellow('请选择操作：'),
            choices: [
                {name: optionTypeName[OPTION_TYPE_KEY.DELETE], value: OPTION_TYPE_KEY.DELETE},
                {name: optionTypeName[OPTION_TYPE_KEY.EXTRACT], value: OPTION_TYPE_KEY.EXTRACT},
                promptInfo.quit
            ]
        }).then((answer: { operate: string }) => {
            this.updateConfigList(answer);
        })
    }

    // 过滤条件配置
    private filterAction = () => {
        inquirer.prompt({
            type: 'input',
            name: 'filter',
            message: yellow('请选输入筛选条件：'),
            default: this.config.filter,
        }).then((answer: { filter: string }) => {
            this.updateConfigList(answer);
        })
    }

    // 匹配模式配置
    private matchAction = () => {
        inquirer.prompt({
            type: 'list',
            name: 'match',
            message: yellow('请选择匹配模式：'),
            choices: [
                {name: optionTypeName[OPTION_TYPE_KEY.INCLUDES], value: OPTION_TYPE_KEY.INCLUDES},
                {name: optionTypeName[OPTION_TYPE_KEY.EQUAL], value: OPTION_TYPE_KEY.EQUAL},
                {name: optionTypeName[OPTION_TYPE_KEY.REG], value: OPTION_TYPE_KEY.REG},
                promptInfo.quit
            ]
        }).then((answer: { operate: string }) => {
            this.updateConfigList(answer);
        })
    }

    // 操作目标类型配置
    private targetTypeAction = () => {
        inquirer.prompt({
            type: 'list',
            name: 'targetType',
            message: yellow('请选择操作目标类型：'),
            choices: [
                {name: optionTypeName[OPTION_TYPE_KEY.FILE], value: OPTION_TYPE_KEY.FILE},
                {name: optionTypeName[OPTION_TYPE_KEY.DIRECTORY], value: OPTION_TYPE_KEY.DIRECTORY},
                promptInfo.quit
            ]
        }).then((answer: { operate: string }) => {
            this.updateConfigList(answer);
        })
    }
}

export default MainHandle;