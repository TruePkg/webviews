const path = require('path')
const Generator = require('yeoman-generator')
const _ = require('lodash')
const chalk = require('chalk')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.argument('componentName', { type: String, required: false })

    if (this.options.componentName) {
      this.componentName = this.options.componentName
    }

    this.componentPath = ''
  }

  prompting() {
    const prompts = []

    if (!this.options.componentName) {
      prompts.push({
        type: 'input',
        name: 'componentName',
        message: 'What would like to name this Component?',
        validate: input => {
          if (input.length <= 0) {
            return 'You must provide a component name'
          }
          return true
        }
      })
    }

    prompts.push({
      type: 'list',
      name: 'componentType',
      message: [
        'What type of component is this?',
        chalk.dim('Stateless: No state. No Lifecycle.'),
        chalk.dim('Pure: No state. Yes Lifecycle.'),
        chalk.dim('Full: Yes state. Yes Lifecycle.')
      ].join('\n'),
      default: 0,
      choices: ['Stateless', 'Pure', 'Full'],
      filter(val) {
        return val.toLowerCase()
      }
    })

    prompts.push({
      type: 'input',
      name: 'rootElement',
      message: 'What is the root element?',
      default: 'div'
    })

    prompts.push({
      type: 'confirm',
      name: 'hasStyles',
      message: ['Will this component have styles?'].join('\n'),
      default: true,
      filter(val) {
        return val.toLowerCase()
      }
    })

    prompts.push({
      type: 'confirm',
      name: 'hasStory',
      message: ['Should I create a story for this component?'].join('\n'),
      default: true,
      filter(val) {
        return val.toLowerCase()
      }
    })

    return this.prompt(prompts).then(answers => {
      if (answers.componentName) {
        this.componentName = answers.componentName
      }

      this.componentType = answers.componentType
      this.hasStyles = answers.hasStyles
      this.hasStory = answers.hasStory
      this.rootElement = answers.rootElement
    })
  }

  write() {
    // Set up our component name and path
    if (/\//.test(this.componentName)) {
      this.componentPath = this.componentName.substr(
        0,
        this.componentName.lastIndexOf('/') + 1
      )
      this.componentName = _.upperFirst(
        _.camelCase(
          this.componentName.substr(this.componentName.lastIndexOf('/') + 1)
        )
      )
    }

    // Copy component template
    this.fs.copyTpl(
      this.templatePath(`index.${this.componentType}.js`),
      this.destinationPath(
        `src/components/${this.componentPath}${this.componentName}/index.js`
      ),
      {
        hasStyles: this.hasStyles,
        componentName: this.componentName,
        rootElement: this.rootElement
      }
    )

    if (this.hasStyles) {
      // Copy style template
      this.fs.copyTpl(
        this.templatePath('style.js'),
        this.destinationPath(
          `src/components/${this.componentPath}${this.componentName}/style.js`
        ),
        {
          rootElement: this.rootElement
        }
      )
    }

    if (this.hasStory) {
      const pathToStorybook = path.relative(
        this.destinationPath(
          `src/components/${this.componentPath}${this.componentName}`
        ),
        this.destinationPath('.storybook')
      )

      // Copy story template
      this.fs.copyTpl(
        this.templatePath('story.js'),
        this.destinationPath(
          `src/components/${this.componentPath}${this.componentName}/story.js`
        ),
        {
          pathToStorybook,
          componentName: this.componentName,
          componentPath: this.componentPath
        }
      )

      // Copy README template
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath(
          `src/components/${this.componentPath}${this.componentName}/README.md`
        ),
        {
          componentName: this.componentName
        }
      )

      // Copy storyshot test
      this.fs.copyTpl(
        this.templatePath('__tests__/storyshot.test.js'),
        this.destinationPath(
          `src/components/${this.componentPath}${this
            .componentName}/__tests__/storyshot.test.js`
        ),
        {
          componentName: this.componentName,
          componentPath: this.componentPath.replace('/', '\\/')
        }
      )
    }

    // Copy Test template
    this.fs.copyTpl(
      this.templatePath('__tests__/index.test.js'),
      this.destinationPath(
        `src/components/${this.componentPath}${this
          .componentName}/__tests__/index.test.js`
      ),
      {
        componentName: this.componentName
      }
    )
  }
}
