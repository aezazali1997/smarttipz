import Button from './index'; //importing the button component

export default {
    title: "My First Button" //title for our storybook
}

const Template = arguments_ => <Button {...arguments_} /> //creating a template

export const Primary = Template.bind({})

//Passing the props to the component

Primary.args = {
    size: "h-10 w-56",
    children: "Primary Button"
}

//these arguments will later be the control on the storybook UI and you can change them in the storybook without coming back to the editor.