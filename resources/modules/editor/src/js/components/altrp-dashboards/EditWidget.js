import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { TABLE } from "../../../../../admin/src/components/dashboard/widgetTypes";

import WidgetDiagram from "../../../../../admin/src/components/dashboard/WidgetDiagram";
import TypeField from "./fields/TypeField";
import LegendField from "./fields/LegendField";
import LegendPositionField from "./fields/LegendPositionField";
import FilterField from "./fields/FilterField";
import SourceField from "./fields/SourceField";
import ColorSchemeField from "./fields/ColorSchemeField";
import VerticalTableField from "./fields/VerticalTableField";
import SortDataField from "./fields/SortDataField";
import { queryString } from "./helpers/queryString";

const EditWidget = ({ data, onEdited, setIsEdit, settings }) => {
  const [widget, setWidget] = useState(data);

  const title = useRef(widget.title);

  const onSave = async () => {
    onEdited({
      ...widget,
      title: title.current.value,
    });
    setIsEdit(false);
  };

  const getTypesBySource = (s) => {
    let string = s;
    string = string.includes('?') ? string.split('?')[0] : s;

    const source =
      settings &&
      settings.sql?.find((item) => string === `/ajax/models/queries/${item.model}/${item.value}`);

    return source?.types?.map((type) => type.value) || [];
  };

  const composeSources = (sources = []) => {
    if ((!sources) || sources.length === 0) return [];

    return sources.map((source) => {
      return {
        name: source.label,
        url: `/ajax/models/queries/${source.model}/${source.value}`,
      };
    });
  };

  const titleHandle = (string, oldString = false) => {
    if (title.current.value.includes(oldString)) {
      title.current.value = title.current.value.replace(oldString, string);
    }

    if (!title.current.value.includes(string)) {
      title.current.value += string;
    }
  }

  if (composeSources(settings.sql).length === 1) {
    let currentSource = composeSources(settings.sql)[0];
    // let filter = '';
    // if (Object.keys(widget.filter).length !== 0) {
    // console.log(widget.filter);
    // filter = queryString(widget.filter);
    // }
    widget.source = currentSource.url;
    // widget.source = currentSource.url + filter;
  }

  return (
    <Card>
      <Card.Header>
        {/* <Card.Title>Редактировать виджет</Card.Title> */}
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Widget's Name</Form.Label>
            <Form.Control type="text" ref={title} defaultValue={widget.title} required />
          </Form.Group>

          <SourceField
            widget={widget}
            setWidget={setWidget}
            sources={composeSources(settings.sql)}
            changeTitle={titleHandle}
          />
          <SortDataField widget={widget} setWidget={setWidget} />

          {widget.source &&
            settings.filter?.length > 0 &&
            settings.filter?.map((param) => (
              <FilterField key={param.value} widget={widget} setWidget={setWidget} param={param} changeTitle={titleHandle} />
            ))}

          <TypeField
            widget={widget}
            setWidget={setWidget}
            allowedTypes={[...getTypesBySource(widget.source), TABLE]}
          />

          {widget.source && widget.type === TABLE && (
            <VerticalTableField widget={widget} setWidget={setWidget} />
          )}

          <ColorSchemeField widget={widget} setWidget={setWidget} />

          <LegendField widget={widget} setWidget={setWidget} />
          <LegendPositionField widget={widget} setWidget={setWidget} />
        </Form>

        <div className={`widget-placeholder altrp-chart ${widget.options?.legendPosition}`}>
          {widget.source && <WidgetDiagram widget={widget} width={360} height={360} />}
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" onClick={() => setIsEdit(false)}>
          Close
        </Button>
        <Button variant="warning" onClick={onSave} disabled={widget.source === ""}>
          Save
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default React.memo(EditWidget);
