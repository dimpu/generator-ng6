const path	     = require('path');
const changeCase = require('change-case');
const Generator = require('yeoman-generator');


module.exports = class extends Generator {
  // constructor
  constructor(args, opts) {
    super(args, opts);
    // this.name = changeCase.paramCase(this.name);
  }

  //promt for path
  prompting(){
    var done = this.async();

      var prompts = [{
        type    : 'input',
        name    : 'componentName',
        message : 'Enter path (relative to components/)?',
        default : 'src/app/components'
      }];

      this.prompt(prompts).then(props=>{
        this.componentName = props.componentName;
        // this.name = props.name;
        done();
      });
  }

  // write to the dist
  writing() {
    const componentsPath = 'src/app/components';
    var files = [
      '.component.js',
      '.controller.js',
      '.css',
      '.html','.js','.spec.js'
    ];
    
    files.forEach((file)=>{
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(path.join(componentsPath, this.componentName, this.componentName + file)),
         {
            name: this.componentName,
            pascalCase: changeCase.pascalCase(this.componentName),
            camelCase:changeCase.camelCase(this.componentName)
          }
      );
    })
  }

}
