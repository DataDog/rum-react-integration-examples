const execSync = require('child_process').execSync

let sdkVersion = '2.15.1'
switch (process.env.BUILD_MODE) {
  case 'release':
    sdkVersion = lernaJson.version
    break
  case 'staging':
    const commitSha1 = execSync('git rev-parse HEAD').toString().trim()
    sdkVersion = `${lernaJson.version}+${commitSha1}`
    break
  default:
    sdkVersion = 'dev'
    break
}
