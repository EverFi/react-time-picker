import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import updateInputWidth, { getFontShorthand } from 'update-input-width';
import { padStart } from '../shared/utils';

/* eslint-disable jsx-a11y/no-autofocus */

function onFocus(event) {
  const { target } = event;

  requestAnimationFrame(() => target.select());
}

function updateInputWidthOnFontLoad(element) {
  if (!document.fonts) {
    return;
  }

  const font = getFontShorthand(element);

  if (!font) {
    return;
  }

  const isFontLoaded = document.fonts.check(font);

  if (isFontLoaded) {
    return;
  }

  function onLoadingDone() {
    updateInputWidth(element);
  }

  document.fonts.addEventListener('loadingdone', onLoadingDone);
}

function getSelectionString() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.getSelection().toString();
}

function makeOnKeyPress(maxLength) {
  return function onKeyPress(event) {
    const { value } = event.target;
    const selection = getSelectionString();

    if (selection || value.length < maxLength) {
      return;
    }

    event.preventDefault();
  };
}

function padIfNeeded(showLeadingZeros, value) {
  return showLeadingZeros ? padStart(value) : `${parseInt(value, 10)}`;
}

export default function Input({
  ariaLabel,
  autoFocus,
  className,
  disabled,
  itemRef,
  max,
  min,
  name,
  nameForClass,
  onChange,
  onKeyDown,
  onKeyUp,
  placeholder = '--',
  required,
  showLeadingZeros,
  step,
  value,
}) {
  const maxLength = max.toString().length + (showLeadingZeros ? 1 : 0);
  const displayValue = value !== null ? padIfNeeded(showLeadingZeros, value) : '';

  return [
    <input
      key="input"
      aria-label={ariaLabel}
      autoComplete="off"
      autoFocus={autoFocus}
      className={mergeClassNames(
        `${className}__input`,
        `${className}__${nameForClass || name}`,
      )}
      disabled={disabled}
      max={showLeadingZeros ? `${max}0` : max}
      min={min}
      name={name}
      onChange={(event) => {
        const newValue = showLeadingZeros ? padStart(event.target.value) : event.target.value;
        if (parseInt(newValue, 10) > max || parseInt(event.target.value, 10) > max) {
          event.preventDefault();
        } else if (onChange) {
          onChange(event);
        }
      }}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onKeyPress={makeOnKeyPress(maxLength)}
      onKeyUp={(event) => {
        updateInputWidth(event.target);

        if (onKeyUp) {
          onKeyUp(event);
        }
      }}
      placeholder={placeholder}
      ref={(ref) => {
        if (ref) {
          updateInputWidth(ref);
          updateInputWidthOnFontLoad(ref);
        }

        if (itemRef) {
          itemRef(ref, name);
        }
      }}
      required={required}
      step={step}
      type="number"
      value={displayValue}
    />,
  ];
}

Input.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  itemRef: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  required: PropTypes.bool,
  showLeadingZeros: PropTypes.bool,
  step: PropTypes.number,
  value: PropTypes.number,
};
