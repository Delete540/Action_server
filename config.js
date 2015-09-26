
var config = {
  path:"",//root of the project dir;
  db:"mongodb://localhost/action",
  secret:'action',
};

if(process.env.NODE_ENV=='development'){
  config.db='mongodb://192.168.56.101:27017/action';
}
config.path=process.cwd();

module.exports = config;
