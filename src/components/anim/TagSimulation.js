"use client"
import React from "react"
import Matter from "matter-js"

class TagSimulation extends React.Component {
  constructor(props) {
    super(props)
    this.sceneRef = React.createRef() // Create a ref to attach to the render target
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
          strokeStyle: "rgba(0,0,0,0.15)",
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
          strokeStyle: "rgba(0,0,0,0.15)",
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
          strokeStyle: "rgba(0,0,0,0.15)",
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
          strokeStyle: "rgba(0,0,0,0.15)",
        },
      }
    )

    const radius = 20

    const tagUiUx = Bodies.rectangle(containerWidth / 2 + 150, 500, 164, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture:
            "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f47541d38f6886e5747c1d_uiux.svg",
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
            texture:
              "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f47540055ab00edffa0a68_wordpress.svg",
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
            texture:
              "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f475405a7c8ff69c27ed37_webflow.svg",
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
            texture:
              "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f47540c9a2047edbb293d1_whitelevel.svg",
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
            texture:
              "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f47540487abf2c397d777f_webflow-green.svg",
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
          texture:
            "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f475407ebe06e52f9283d1_sass.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagWeb = Bodies.rectangle(containerWidth / 2 - 142, 440, 186, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture:
            "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f47540f762b61424410849_web.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagStartup = Bodies.rectangle(containerWidth / 2 - 10, 260, 128, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture:
            "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f475402ae28c15adeba62f_startup.svg",
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
            texture:
              "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f47540f86ad4f4175a1e69_maintence.svg",
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
            texture:
              "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f47540035d9b03fc33e447_integration.svg",
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
          texture:
            "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f475405a7c8ff69c27ed00_motion.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagPay = Bodies.rectangle(containerWidth / 2 - 59, 260, 172, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture:
            "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f475406ef461a95eaa0f12_pay.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagGsap = Bodies.rectangle(containerWidth / 2 - 59, 260, 115, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture:
            "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f47540f86ad4f4175a1df1_gsap.svg",
          xScale: 1,
          yScale: 1,
        },
      },
    })
    const tagFigma = Bodies.rectangle(containerWidth / 2 - 59, 260, 210, 56, {
      chamfer: {radius: radius},
      render: {
        sprite: {
          texture:
            "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f475407a05afc618131310_figma.svg",
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
            texture:
              "https://uploads-ssl.webflow.com/64f41ea3b31af27272713c03/64f47540bfb0eee6858d556a_migration.svg",
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
