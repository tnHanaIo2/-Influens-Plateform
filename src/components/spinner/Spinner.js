import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = ({ message = "Preparing To TargetAutomation..." }) => (
  <Dimmer active inverted>
    <Loader size="huge" content={message && message} />
  </Dimmer>
);

export default Spinner;
