---
uid: Abyss.Contribute.Docs.Edit.Mermaid
---

# Mermaid Diagrams

DocFx supports Mermaid diagrams, which are a simple way to create diagrams in markdown.
Here is an example:

``````markdown
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
``````

This will render as:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## More Examples

# [Flowchart](#tab/flowchart)

```mermaid
flowchart TD
%% Nodes
    A("fab:fa-youtube Starter Guide")
    B("fab:fa-youtube Make Flowchart")
    n1@{ icon: "fa:gem", pos: "b", h: 24}
    C("fa:fa-book-open Learn More")
    D{"Use the editor"}
    n2(Many shapes)@{ shape: delay}
    E(fa:fa-shapes Visual Editor)
    F("fa:fa-chevron-up Add node in toolbar")
    G("fa:fa-comment-dots AI chat")
    H("fa:fa-arrow-left Open AI in side menu")
    I("fa:fa-code Text")
    J(fa:fa-arrow-left Type Mermaid syntax)

%% Edge connections between nodes
    A --> B --> C --> n1 & D & n2
    D -- Build and Design --> E --> F
    D -- Use AI --> G --> H
    D -- Mermaid js --> I --> J

%% Individual node styling. Try the visual editor toolbar for easier styling!
    style E color:#FFFFFF, fill:#AA00FF, stroke:#AA00FF
    style G color:#FFFFFF, stroke:#00C853, fill:#00C853
    style I color:#FFFFFF, stroke:#2962FF, fill:#2962FF

%% You can add notes with two "%" signs in a row!
```

# [Sequence Diagram](#tab/sequence)

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

# [Gantt Chart](#tab/gantt)

```mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2022-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2022-01-12  , 12d
    another task     : 24d
```

# [Class Diagram](#tab/class)

```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal
    Fish : +int fins
    Fish : +int scales
    Zebra : +bool is_wild
    Zebra : +bool is_striped
```

# [Pie Chart](#tab/chart)

```mermaid
pie
    title Key elements in Product X
    "Calcium" : 42
    "Potassium" : 21
    "Magnesium" : 12
    "Iron" : 9
```

# [State Diagram](#tab/state)

```mermaid
stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

---

To create your own diagrams, you can use

* the [Mermaid free Playground](https://www.mermaidchart.com/play)
* or the older [Mermaid Live Editor](https://mermaid-js.github.io/mermaid-live-editor/).

Mermaid has so many features, so if you love it, best check out the [official docs](https://mermaid.js.org/intro/).

---

## History

1. Supported since ca. 2022
