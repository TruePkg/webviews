import initStoryshots from '@storybook/addon-storyshots'

initStoryshots({
  storyKindRegex: /^<%= componentPath %><%= componentName %>$/
})
