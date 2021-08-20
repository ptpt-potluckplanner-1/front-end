# front-end

## Running the app
+ cd into /potluck-planner
+ npm start

## Testing
+ cd into /potluck-planner
+ npm run test
+ To add a render test for a new component, use the code snippet 'test' (assuming you're using VSCode) in the component.test.js file, you will only need to type the component name in *DoubleCamelCase*, then *singleCamelCase* ``` test [tab] Component [tab] component ``` and you've written a test.
This assumes that your file structure keeps the components in ```/components``` and the tests in ```/tests```
* add ```data-testid="component"``` to the component's topmost element, replacing "component" with the name of the component you are testing.