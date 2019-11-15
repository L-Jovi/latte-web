/*
 * services
 * 业务性的内容会被单独内聚到不同的模块内
 * 作为单独的域，边界就是接受业务逻辑所需的输入
 * 输出业务所需的数据结构（也就是前端所需的纯业务数据，非界面展示数据）
 * */
import * as http from '~services/http'

const apiRepos = 'https://api.github.com/repos/stedolan/jq/commits?per_page=5'

// 这里以调用 github free repos api 为例，取出其中返回的 name 作为业务数据
export const getRepos = () => {
  return http.get(apiRepos)
    .then((data) => {
      return data.map((item) => {
        return item.commit.author.name
      })
    })
}
