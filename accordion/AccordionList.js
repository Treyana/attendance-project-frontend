import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchAccordions, getAllAccordions } from "./accordionSlice";
import AccordionItem from "./AccordionItem";
import { fetchClasses } from "../class/classSlice";
import { fetchSemesters } from "../semester/semesterSlice";

const AccordionList = () => {
  const dispatch = useDispatch();
  const accordions = useSelector(getAllAccordions);

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchSemesters());
    dispatch(fetchAccordions());
  });

  let content;

  content = accordions.map((c) => (
    <AccordionItem
      id={c.id}
      subtimea={c.subtimea}
      subtimeb={c.subtimeb}
      subtimec={c.subtimec}
      subtimed={c.subtimed}
      subtimee={c.subtimee}
      subtimef={c.subtimef}
      subtimeg={c.subtimeg}
      subtimeh={c.subtimeh}
      subtimei={c.subtimei}
      subtimej={c.subtimej}
      subtimek={c.subtimek}
      subtimel={c.subtimel}
      subtimem={c.subtimem}
      subtimen={c.subtimen}
      subtimeo={c.subtimeo}
      subtimep={c.subtimep}
      subtimeq={c.subtimeq}
      subtimer={c.subtimer}
      subtimes={c.subtimes}
      subtimet={c.subtimet}
      subtimeu={c.subtimeu}
      subtimev={c.subtimev}
      subtimew={c.subtimew}
      subtimex={c.subtimex}
      subtimey={c.subtimey}
      subtimez={c.subtimez}
      subtimedf={c.subtimedf}
      subtimece={c.subtimece}
      subtimegk={c.subtimegk}
      subtimeml={c.subtimeml}
      yearClass={c.yearClass}
      semester={c.semester}
    />
  ));

  return content;
};

export default AccordionList;
