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
        name    : 'factoryName',
        message : 'Enter path (relative to services/)?',
        default : 'src/app/services'
      }];

      this.prompt(prompts).then(props=>{
        this.factoryName = props.factoryName;
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
        this.destinationPath(path.join(componentsPath, this.factoryName, this.factoryName + file)),
         {
            name: this.factoryName,
            pascalCase: changeCase.pascalCase(this.factoryName),
            camelCase:changeCase.camelCase(this.factoryName)
          }
      );
    })
  }

}
