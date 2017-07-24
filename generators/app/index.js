'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var Generator = require('yeoman-generator');

var gen ={};

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());
  }

  initializing() {
    this.props = {};
  }

  // ask app name
  prompting() {
    // var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the beautiful Ng6 generator!'
    ));

    let prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your project name ?',
      default : this.appname,
      store   : true
    }];
    
   return this.prompt(prompts,  (props) => {
   
    }).then(props => {
      this.props = props;
      this.config.set({ 'app_name': props.name});
    });

  }

  writing() {
    this.fs.copy(
      this.sourceRoot(),
      this.destinationRoot()
    );
  }

  // tell the generator to install dependencies
  install() {
    let dependencies = [
      'angular','angular-route', '@uirouter/angularjs'
    ]
    dependencies.forEach((dep) => {
       this.npmInstall([dep], { 'save': true });          
    });
    this.npmInstall();
  }

}
