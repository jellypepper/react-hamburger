import React from 'react';
import './styles.module.css';

/**
 * Hamburger component
 * Animated hamburger menu icon
 * @property {boolean} open Whether hamburger menu is open
 * @property {boolean} duoLine Whether to remove center line
 */
export default function Hamburger({
  open = false,
  duoLine = false,
  className,
  ...attrs
}) {
  return (
    <div
      styleName="hamburger"
      data-open={open}
      className={className || ''}
      {...attrs}
    >
      <span styleName="line line-top"></span>
      {!duoLine && <span styleName="line line-middle"></span>}
      <span styleName="line line-bottom"></span>
    </div>
  );
}
