import template from './<%= name %>.html';
import controller from './<%= name %>.controller';
import './<%= name %>.css';

let <%= camelCase %>Component = function(){
	return {
		template,
		controller
	};
};

export default <%= camelCase %>Component;
