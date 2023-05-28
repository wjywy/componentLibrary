#! /usr/bin/env node

console.log('module-react-cli working ~')
const program = require('commander')
let chalk = require('chalk')
let figlet = require('figlet')
program
    // 定义命令和参数
    .command('create <app-name>')
    .description('create a new project')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        require('../lib/create.js')(name, options)
        // 打印执行结果
        console.log('name:', name, 'options:', options)
    })

program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config')
    .action((value, options) => {
        console.log(value, options)
    })

program
    // 监听 --help 执行
    .on('--help', () => {
        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan(`zr <command> --help`)} for detailed usage of given command\r\n`)
    })

program
    .command('ui')
    .description('start add open roc-cli ui')
    .option('-p, --port <port>', 'Port used for the UI Server')
    .action((option) => {
        console.log(option)
    })

program
    .on('--help', () => {
        // 使用 figlet 绘制 Logo
        console.log('\r\n' + figlet.textSync('running', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }));
        // 新增说明信息
        // console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
    })

program
    // 配置版本号信息
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]')

// 解析用户执行命令传入参数
program.parse(process.argv);