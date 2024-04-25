"use client"
import React from "react"
import Matter from "matter-js"

class TagSimulation extends React.Component {
  constructor(props) {
    super(props)
    this.sceneRef = React.createRef()
  }

  componentDidMount() {
    const {Engine, Render, World, Bodies, Mouse, MouseConstraint, Events} =
      Matter
    const engine = Engine.create()
    const containerElement = this.sceneRef.current
    const containerWidth = containerElement.clientWidth
    const containerHeight = containerElement.clientHeight

    const render = Render.create({
      element: containerElement,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        pixelRatio: 2,
        background: "transparent",
        wireframes: false,
      },
    })

    // Setup static and dynamic bodies here, adapted from your script
    const ground = Bodies.rectangle(
      containerWidth / 2,
      containerHeight + 80,
      containerWidth + 320,
      160,
      {
        isStatic: true,
        render: {
          strokeStyle: "rgba(0,0,0,0)",
        },
      }
    )

    const wallLeft = Bodies.rectangle(
      -80,
      containerHeight / 2,
      160,
      containerHeight,
      {
        isStatic: true,
        render: {
          strokeStyle: "rgba(0,0,0,0)",
        },
      }
    )

    const wallRight = Bodies.rectangle(
      containerWidth + 80,
      containerHeight / 2,
      160,
      1200,
      {
        isStatic: true,
        render: {
          strokeStyle: "rgba(0,0,0,0)",
        },
      }
    )

    const roof = Bodies.rectangle(
      containerWidth / 2 + 160,
      -80,
      containerWidth + 320,
      160,
      {
        isStatic: true,
        render: {
          strokeStyle: "rgba(0,0,0,0)",
        },
      }
    )

    const radius = 20

    const tagUiUx = Bodies.rectangle(containerWidth / 2 + 150, 500, 164, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture: "/matter/ui-ux.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagWordpress = Bodies.rectangle(
      containerWidth / 2 + 150,
      460,
      240,
      56,
      {
        chamfer: {radius: radius},
        render: {
          sprite: {
            texture: "/matter/webflow.svg",
            xScale: 1,
            yScale: 1,
          },
        },
      }
    )
    const tagWebflow = Bodies.rectangle(
      containerWidth / 2 + 250,
      420,
      200,
      56,
      {
        chamfer: {radius: radius},
        render: {
          sprite: {
            texture: "/matter/wordpress.svg",
            xScale: 1,
            yScale: 1,
          },
        },
      }
    )
    const tagWhitelevel = Bodies.rectangle(
      containerWidth / 2 - 75,
      380,
      160,
      56,
      {
        chamfer: {radius: radius},
        render: {
          sprite: {
            texture: "/matter/javascript.svg",
            xScale: 1,
            yScale: 1,
          },
        },
      }
    )
    const tagWebflowgreen = Bodies.rectangle(
      containerWidth / 2 - 74,
      540,
      248,
      56,
      {
        chamfer: {radius: radius},
        render: {
          sprite: {
            texture: "/matter/react.svg",
            xScale: 1,
            yScale: 1,
          },
        },
      }
    )
    const tagSass = Bodies.rectangle(containerWidth / 2 + 174, 490, 105, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture: "/matter/vuejs.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagWeb = Bodies.rectangle(containerWidth / 2 - 142, 440, 186, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture: "/matter/css.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagStartup = Bodies.rectangle(containerWidth / 2 - 10, 260, 128, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture: "/matter/animations.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagMaintence = Bodies.rectangle(
      containerWidth / 2 - 242,
      420,
      168,
      56,
      {
        chamfer: {radius: radius},
        render: {
          sprite: {
            texture: "/matter/responsive.svg",
            xScale: 1,
            yScale: 1,
          },
        },
      }
    )
    const tagIntegration = Bodies.rectangle(
      containerWidth / 2 + 60,
      380,
      155,
      56,
      {
        chamfer: {radius: radius},
        render: {
          sprite: {
            texture: "/matter/figma.svg",
            xScale: 1,
            yScale: 1,
          },
        },
      }
    )
    const tagMotion = Bodies.rectangle(containerWidth / 2, 360, 180, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture: "/matter/photoshop.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagPay = Bodies.rectangle(containerWidth / 2 - 59, 260, 172, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture: "/matter/api.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagGsap = Bodies.rectangle(containerWidth / 2 - 59, 260, 115, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture: "/matter/adobe-suite.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagFigma = Bodies.rectangle(containerWidth / 2 - 59, 260, 210, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture: "/matter/git.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagMigration = Bodies.rectangle(
      containerWidth / 2 - 59,
      260,
      145,
      56,
      {
        chamfer: {radius: radius},
        render: {
          sprite: {
            texture: "/matter/typescript.svg",
            xScale: 1,
            yScale: 1,
          },
        },
      }
    )

    World.add(engine.world, [
      ground,
      wallLeft,
      wallRight,
      roof,
      tagUiUx,
      tagWordpress,
      tagWebflow,
      tagWhitelevel,
      tagWebflowgreen,
      tagSass,
      tagWeb,
      tagStartup,
      tagMaintence,
      tagIntegration,
      tagMotion,
      tagPay,
      tagGsap,
      tagFigma,
      tagMigration,
    ]) // Add all bodies to the world

    // Mouse interaction setup
    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {visible: false},
        },
      })

    World.add(engine.world, mouseConstraint)
    render.mouse = mouse

    // Custom logic for mouse events
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    )
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    )

    // Run the engine and renderer
    Engine.run(engine)
    Render.run(render)

    // Setup IntersectionObserver to initialize the simulation
    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       initSimulation();
    //       observer.disconnect();
    //     }
    //   });
    // }, {});

    // observer.observe(containerElement);
  }

  render() {
    return (
      <>
        <div ref={this.sceneRef} className="w-full h-[600px]" />
      </>
    )
  }
}

export default TagSimulation
