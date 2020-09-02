import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
    Animated,
    Easing,
    Platform
} from "react-native";

export default class CheckBox extends React.Component {
    constructor(props) {
        super(props)

        this.animationScale = new Animated.Value(props.checked ? 1 : 0);
        this.animationLeft = new Animated.Value(
            props.checked ? 0 : -props.size
        );
        this.animationReveal = new Animated.Value(
            props.checked ? props.size : 0
        );
        this.rippleScale = new Animated.Value(0.01);
        this.rippleOpacity = new Animated.Value(0.1);
    }

    componentDidUpdate(prevProps, prevState) {
        const { animationType, onValueChange, checked } = this.props;
        if (prevProps.checked !== checked) {
            if (animationType === "scale") this.animateScale(!checked);
            else if (animationType === "left") this.animateLeft(!checked);
            else this.animateReveal(!checked);
        }
    }

    animateScale = (checked) => {
        if (checked)
            Animated.timing(this.animationScale, {
                toValue: 0.01,
                duration: 100,
                easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                useNativeDriver: true
            }).start();
        else {
            Animated.timing(this.animationScale, {
                toValue: 1,
                easing: Easing.elastic(2),
                duration: 100,
                useNativeDriver: true
            }).start();
        }
    };

    animateLeft = (checked) => {
        const { size } = this.props;

        if (checked)
            Animated.timing(this.animationLeft, {
                toValue: -size,
                duration: 50,
                easing: Easing.ease,
                useNativeDriver: true
            }).start();
        else
            Animated.timing(this.animationLeft, {
                toValue: 0,
                easing: Easing.elastic(1.2),
                duration: 150,
                useNativeDriver: true
            }).start();
    };

    animateReveal = (checked) => {
        const { size } = this.props;

        if (checked)
            Animated.timing(this.animationReveal, {
                toValue: 0,
                duration: 50,
                easing: Easing.ease,
                useNativeDriver: true
            }).start();
        else
            Animated.timing(this.animationReveal, {
                toValue: size,
                easing: Easing.ease,
                duration: 100,
                useNativeDriver: true
            }).start();
    };

    onPressedIn = () => {
        Animated.parallel([
            Animated.timing(this.rippleScale, {
                toValue: 1,
                duration: 150,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: Platform.OS === "android"
            }),
            Animated.timing(this.rippleOpacity, {
                toValue: 0,
                duration: 300,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: Platform.OS === "android"
            })
        ]).start(() => {
            this.rippleScale.setValue(0.01);
            this.rippleOpacity.setValue(0.1);
        });
    };

    _renderTextBtn = (position) => {
        const {
            label,
            touchableLabel,
            checkPosition,
            labelStyle,
            rippleEffect,
            labelContainerStyle,
            checked,
            onValueChange
        } = this.props;

        if (!label || position !== checkPosition) return null;

        return (
            <TouchableOpacity
                onPressIn={rippleEffect && touchableLabel && this.onPressedIn}
                onPress={() => touchableLabel && onValueChange(!checked)}
                activeOpacity={touchableLabel ? 0.7 : 1}
                style={[{ justifyContent: "center", flex: 1 }, labelContainerStyle]}
            >
                {
                    React.isValidElement(label)
                        ? label
                        : <Text style={[{ padding: 10 }, labelStyle]}>{label}</Text>
                }
            </TouchableOpacity>
        );
    };

    _renderCheckBtn = () => {
        const {
            checked,
            size,
            checkedBackgroundColor,
            unCheckedBackgroundColor,
            unCheckedBorderColor,
            checkedBorderColor,
            borderWidth,
            rounded,
            checkBoxRadius,
            checkMarkSize,
            checkMarkColor,
            animationType,
            checkStyle,
            checkboxContainerStyle,
            boxStyle,
            customMarker,
            onValueChange
        } = this.props;

        var animate = {};
        if (animationType === "scale")
            animate = { transform: [{ scale: this.animationScale }] };
        else if (animationType === "left")
            animate = { transform: [{ translateX: this.animationLeft }] };

        return (
            <TouchableOpacity
                onPress={() => onValueChange(!checked)}
                activeOpacity={0.7}
                style={[{ padding: 10 }, checkboxContainerStyle]}
            >
                <View
                    style={[
                        {
                            width: size,
                            height: size,
                            borderRadius: rounded ? size : checkBoxRadius || size * 0.2,
                            borderWidth: borderWidth,
                            borderColor: checked ? checkedBorderColor : unCheckedBorderColor,
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            backgroundColor: checked
                                ? checkedBackgroundColor
                                : unCheckedBackgroundColor
                        },
                        boxStyle
                    ]}
                >
                    {
                        customMarker ?
                            <Animated.View style={animate}>{customMarker}</Animated.View>
                            :
                            <Animated.Text
                                style={[
                                    {
                                        fontSize: checkMarkSize,
                                        lineHeight: size,
                                        color: checkMarkColor
                                    },
                                    checkStyle,
                                    animate,
                                ]}
                            >✓</Animated.Text>
                    }

                    {
                        animationType === "reveal" &&
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: size,
                                aspectRatio: 1 / 1,
                                borderRadius: rounded ? size : size * 0.05,
                                backgroundColor: checked
                                    ? checkedBackgroundColor
                                    : unCheckedBackgroundColor,
                                transform: [{ translateX: this.animationReveal }]
                            }}
                        />
                    }
                </View>
            </TouchableOpacity>
        );
    };

    _renderRipple() {
        return (
            <Animated.View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    transform: [{ scale: this.rippleScale }],
                    opacity: this.rippleOpacity,
                    backgroundColor: this.props.rippleColor
                }}
            />
        );
    }

    render() {
        return (
            <View
                style={[
                    { flexDirection: "row", alignItems: "center" },
                    this.props.containerStyle
                ]}
            >
                {this._renderRipple()}
                {this._renderTextBtn("right")}
                {this._renderCheckBtn()}
                {this._renderTextBtn("left")}
            </View>
        );
    }
}

CheckBox.defaultProps = {
    label: 'Your label here',
    checked: false,
    touchableLabel: true,
    size: 20,
    checkPosition: 'left',
    checkedBackgroundColor: "#22cdf0",
    unCheckedBackgroundColor: "white",
    unCheckedBorderColor: "grey",
    checkedBorderColor: "transparent",
    borderWidth: 1,
    rippleEffect: true,
    rippleColor: 'black',
    rounded: false,
    checkMarkSize: 12,
    checkMarkColor: "black",
    animationType: "scale",
}