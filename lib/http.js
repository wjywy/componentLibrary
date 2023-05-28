// lib/http.js

// 通过 axios 处理请求
const axios = require('axios')
const https = require('https')

const agent = new https.Agent({
    rejectUnauthorized: false,
})

axios.interceptors.response.use(res => {
    return res.data;
})

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
    const data = await axios.get("https://api.github.com/orgs/LanshanTeam/repos", { httpsAgent: agent })
    console.log(data, 'data')
    return data
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称    
 * @returns Promise
 * https://api.github.com/repos/LanshanTeam/LanUI/${repo}/tags
 */
async function getTagList(repo) {
    return axios.get(`https://api.github.com/repos/LanshanTeam/${repo}/tags`, { httpsAgent: agent })
}

module.exports = {
    getRepoList,
    getTagList
}