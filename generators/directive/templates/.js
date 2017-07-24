import angular from 'angular';
import '@uirouter/angularjs';
import <%= pascalCase %>Directive from './<%= name %>.directive';

let <%= camelCase %>Module = angular.module('<%= name %>', [
        'ui.router'
    ])
    .directive('<%= camelCase %>', <%= pascalCase %>Directive);

export default <%= camelCase %>Module;