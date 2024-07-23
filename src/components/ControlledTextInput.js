import React, {useCallback, memo} from 'react';
import {Controller} from 'react-hook-form';

function ControlledComponent(props) {
  const {control, name, children, onChange, valueAsKey, onChangeTextAsKey} =
    props;

  const RenderChildren = useCallback(
    childProps => {
      return typeof children === 'function'
        ? children(childProps)
        : React.cloneElement(children, childProps);
    },
    [children],
  );

  const renderControlledChildren = useCallback(
    ({field: {onChange: onChangeInner, onBlur, value}, fieldState}) => {
      const {error} = fieldState;
      function onChangeHandler(enteredText) {
        if (onChange && typeof onChange === 'function') {
          onChange(enteredText);
        }
        onChangeInner(enteredText);
      }

      const dynamicProp = {
        [valueAsKey ? `${valueAsKey}` : 'value']: value,
        [onChangeTextAsKey ? `${onChangeTextAsKey}` : 'onChangeText']:
          onChangeHandler,
      };

      return (
        <RenderChildren
          // ref={ref}
          // value={value}
          // onChangeText={onChangeHandler}
          key={name}
          onBlur={onBlur}
          defaultValue={value}
          error={error?.message ?? ''}
          {...dynamicProp}
        />
      );
    },
    [name, onChange, onChangeTextAsKey, valueAsKey],
  );

  return (
    <Controller
      key={`controller_${name}`}
      control={control}
      render={renderControlledChildren}
      name={name}
    />
  );
}

function areEqualProps(prevProps, nextProps) {
  const {
    name: prevName,
    valueAsKey: prevValueAsKey,
    label: prevLabel,
  } = prevProps;
  const {
    name: nextName,
    valueAsKey: nextValueAsKey,
    label: nextLabel,
  } = nextProps;

  return (
    prevName === nextName &&
    prevValueAsKey === nextValueAsKey &&
    prevLabel === nextLabel
  );
}

export default memo(ControlledComponent, areEqualProps);
