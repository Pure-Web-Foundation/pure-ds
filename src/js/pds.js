const PDS = {};

import {
  Generator,
  adoptLayers,
  adoptPrimitives,
  createStylesheet,
  isLiveMode,
} from "./pds-core/pds-generator.js";
import { registry } from "./pds-core/pds-registry";
import ontology from "./pds-core/pds-ontology";
import { findComponentForElement } from "./pds-core/pds-ontology.js";

PDS.Generator = Generator;
PDS.registry = registry;
PDS.ontology = ontology;
PDS.adoptLayers = adoptLayers;
PDS.adoptPrimitives = adoptPrimitives;
PDS.createStylesheet = createStylesheet;
PDS.isLiveMode = isLiveMode;
PDS.findComponentForElement = findComponentForElement;

Object.freeze(PDS);

export { PDS };
