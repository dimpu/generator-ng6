const path	     = require('path');
const changeCase = require('change-case');
const Generator  = require('yeoman-generator');


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
        name    : 'directiveName',
        message : 'Enter path (relative to directives/)?',
        default : 'src/app/directives'
      }];

      this.prompt(prompts).then(props=>{
        this.directiveName = props.directiveName;
        done();
      });
  }

  // write to the dist
  writing() {
    const directivesPath = 'src/app/directives';
    var files = [
      '.directive.js',
      '.controller.js',
      '.css',
      '.html','.js','.spec.js'
    ];
    
    files.forEach((file)=>{
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(path.join(directivesPath, this.directiveName, this.directiveName + file)),
         {
            name: this.directiveName,
            pascalCase: changeCase.pascalCase(this.directiveName),
            camelCase:changeCase.camelCase(this.directiveName)
          }
      );
    })
  }

}
