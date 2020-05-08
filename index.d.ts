declare module "react-native-checkbox-animated" {
  import React, { Component } from "react";
  import { StyleProp, TextStyle, ViewStyle } from "react-native";

  export interface CheckBoxProps {
    /**
     *  Current state of the checkBox. Default = false.
     */
    checked: boolean;

    /**
     *  Callback that gets called when checkbox is pressed.
     */
    onValueChange: (val: boolean) => boolean;

    /**
     *  Specify the size of the checkBox. Default = 20
     */
    size: number;

    /**
     *  Text that follows the checkbox.
     */
    label?: string | React.ReactNode;

    /**
     *  Specify if checkbox will behave as in a group.
     */
    group?: boolean;

    /**
     *  Specify if state of checkbox changes when label is pressed. Default = true
     */
    touchableLabel: boolean;

    /**
     *  Specify if label has ripple effect on press when touchableLabel is set to true. Default = true
     */
    rippleEffect: boolean;

    /**
     *  Specify the color of ripple effect when it is set to true. Default = black
     */
    rippleColor: string;

    /**
     *  Specify the color of checkbox's background when it's checked. Default = #22cdf0
     */
    checkedBackgroundColor: string;

    /**
     *  Specify the color of checkbox's background when it's not checked. Default = white
     */
    unCheckedBackgroundColor: string;

    /**
     *  Specify the color of checkbox's border when it's checked. Default = grey
     */
    checkedBorderColor: string;

    /**
     *  Specify the color of checkbox's border when it's not checked. Default = transparent
     */
    unCheckedBorderColor: string;

    /**
     *  border width of checkbox. Default = 1
     */
    borderWidth: boolean;

    /**
     *  Specify the position where the checkbox will be rendered. Default = left
     */
    checkPosition: "left" | "right";

    /**
     *  Set the shape of the checkbox to be rounded instead of a square. Default = false
     */
    rounded: boolean;

    /**
     *  Set radius of the checkbox. Default = 20% of size
     */
    checkBoxRadius: number;

    /**
     *  Specify the size of the checkbox. Default = 15
     */
    checkMarkSize: number;

    /**
     *  Specify the color of the checkmark. Default = black
     *  Important: checkmark 1 has a fixed grey color, you cannot change it.
     */
    checkMarkColor: string;

    /**
     *  Specify the custom animation type. Default = scale
     */
    animationType: "scale" | "left" | "reveal";

    /**
     *  Text styles props applied to the checkmark character.
     */
    checkStyle: StyleProp<TextStyle>;

    /**
     *  Text styles props applied to your label.
     */
    labelStyle?: StyleProp<TextStyle>;

    /**
     *  View styles props applied to label container.
     */
    labelContainerStyle?: StyleProp<ViewStyle>;

    /**
     *  View styles props applied to the main container.
     */
    containerStyle?: StyleProp<ViewStyle>;

    /**
     *  View styles props applied to the container that wraps the checkbox.
     */
    checkboxContainerStyle?: StyleProp<ViewStyle>;

    /**
     *  View styles props applied to the box that wraps the checkmark.
     */
    boxStyle?: StyleProp<ViewStyle>;

    /**
     *  Replace the checkmark for your custom mark.
     */
    customMarker?: () => React.ReactNode;
  }

  class CheckBox extends Component<CheckBoxProps> {}

  export default CheckBox;
}
