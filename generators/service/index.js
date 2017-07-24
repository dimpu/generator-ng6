const path	     = require('path');
const changeCase = require('change-case');
const Generator = require('yeoman-generator');


module.exports = class extends Generator {
  // constructor
  constructor(args, opts) {
    super(args, opts);
  }

  //promt for path
  prompting(){
    var done = this.async();

      var prompts = [{
        type    : 'input',
        name    : 'serviceName',
        message : 'Enter path (relative to components/)?',
        default : 'src/app/components'
      }];

      this.prompt(prompts).then(props=>{
        this.serviceName = props.serviceName;
        done();
      });
  }

  // write to the dist
  writing() {
    const componentsPath = 'src/app/services';
    var files = [
      '.service.js',
      '.service.spec.js'
    ];
    
    files.forEach((file)=>{
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(path.join(componentsPath, this.serviceName, this.serviceName + file)),
         {
            name: this.serviceName,
            pascalCase: changeCase.pascalCase(this.serviceName),
            camelCase:changeCase.camelCase(this.serviceName)
          }
      );
    })
  }

}
