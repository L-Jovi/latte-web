import * as http from '~services/http'

const apiRepos = 'https://api.github.com/repos/stedolan/jq/commits?per_page=5'

export const getRepos = () => {
  return http.get(apiRepos)
}
