const path = require('path')
const Generator = require('yeoman-generator')
const _ = require('lodash')
const chalk = require('chalk')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.argument('viewName', { type: String, required: false })

    if (this.options.viewName) {
      this.viewName = this.options.viewName
    }

    this.viewPath = ''
  }

  prompting() {
    const prompts = []

    if (!this.options.viewName) {
      prompts.push({
        type: 'input',
        name: 'viewName',
        message: 'What would like to name this View?',
        validate: (input) => {
          if (input.length <= 0) {
            return 'You must provide a view name'
          }
          return true
        }
      })
    }

    return this.prompt(prompts).then((answers) => {
      if (answers.viewName) {
        this.viewName = answers.viewName
      }
    })
  }

  write() {

    // Set up our component name and path
    if (/\//.test(this.viewName)) {
      this.viewPath = this.viewName.substr(
        0,
        this.viewName.lastIndexOf('/') + 1
      )
      this.viewName = _.upperFirst(
        _.camelCase(
          this.viewName.substr(this.viewName.lastIndexOf('/') + 1)
        )
      )
    }

    // Setup src root
    const pathToSrcRoot = path.relative(
      this.destinationPath(
        `src/components/${this.viewPath}${this.viewName}`
      ),
      this.destinationPath('src')
    )

    // Copy component template
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(`src/views/${this.viewPath}${this.viewName}/component.js`),
      {
        viewName: this.viewName
      }
    )

    // Copy Container template
    this.fs.copyTpl(
      this.templatePath('container.js'),
      this.destinationPath(`src/views/${this.viewPath}${this.viewName}/container.js`),
      {
        viewName: this.viewName
      }
    )

    // Copy Component Test template
    this.fs.copyTpl(
      this.templatePath('__tests__/component.test.js'),
      this.destinationPath(`src/views/${this.viewPath}${this.viewName}/__tests__/component.test.js`),
      {
        viewName: this.viewName
      }
    )
  }
}
