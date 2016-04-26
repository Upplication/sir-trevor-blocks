## Upplication SirTrevor blocks

Custom blocks:

* button
* ck-editor
* header-align
* image-edit
* map
* spacer
* text-align
* widget
* columns

### INSTALLATION

Clone this repo and install the dependencies:

* Install node dependencies: `npm install`
* Install project dependencies: `bower install`

### DEVELOPMENT
Before doing any of the following tasks make sure **you have installed the project**

* `gulp doc` generate the jsdocs and store in the doc folder
* `gulp compile` generate new compile results of the blocks: `sir-trevor-blocks.js`, `sir-trevor-blocks.min.js`, `sir-trevor-blocks.css`, and`sir-trevor-blocks.min.css`
* `gulp patch` compile and generate a new tag in the git repository incrementing the path version
* `gulp feature` compile and generate a new tag in the git repository incrementing the feature version
* `gulp release` compile and generate a new tag in the git repository incrementing the major version