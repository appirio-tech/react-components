/**
 * Demonstration of react-svg-loader. To see it in action, run the App and
 * navigate to http://localhost:8080/#/ReactSvgLoaderDemo.
 */

import React from 'react';
import SampleIcon from './demo-icon.svg';
import './ReactSvgLoaderDemo.scss';

export default function ReactSvgLoaderDemo() {
  return (
    <div className="ReactSvgLoaderDemo">
      <div>
        Sample icon loaded with <em>react-svg-loader</em>. With ReactJS
        properties you can override styles of the top-level component inside
        your .svg.
      </div>
      <SampleIcon />
      <SampleIcon height="72" width="72" />
      <SampleIcon height="84" width="84" />
      <SampleIcon height="96" width="96" />
      <div>
        To keep styling at SCSS side, you just set the <em>className</em> you
        like for your loaded image, and then use it in SCSS. Color of this icon
        is modified here with this approach.
      </div>
      <SampleIcon />
      <SampleIcon className="red" />
      <SampleIcon className="green" />
      <SampleIcon className="blue" />
    </div>
  );
}
