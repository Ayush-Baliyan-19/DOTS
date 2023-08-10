"use client";

import React from "react";
import { compile } from "vega-lite";
import { parse, View } from "vega";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MdDelete, MdOutlineChangeCircle } from "react-icons/md";
import { BiData, BiZoomIn } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import "./Screen.css";
const Screen = ({
  db,
  setClicked,
}: {
  db: number;
  setClicked: React.Dispatch<React.SetStateAction<Array<string>>>;
}) => {
  const [visualization, setVisualization] = React.useState<any>([]);
  const [zoomedIndex, setZoomedIndex] = React.useState<number | null>(null);
  const zoomedSvgRef = React.useRef<any>(null);

  const getvisualization = async (db: number) => {
    let visualizations = [
      ///////////////////////////////    1  Histogram     /////////////////////////////////
      {
        vis_name: "Histogram",
        description: "A simple bar chart with embedded data.",
        width: 200,
        height: 200,
        mark: { type: "bar", binSpacing: 1 },
        encoding: {
          x: {
            bin: { maxbins: 15 },
            field: "",
            type: "quantitative",
          },
          y: { aggregate: "count" },
        },
      },

      ///////////////////////////////    2  BarChartxOffOrdinal     /////////////////////////////////
      {
        vis_name: "BarChartxOffOrdinal",
        description: "A simple bar chart with embedded data.",
        width: 200,
        height: 200,
        mark: { type: "bar", width: 10 },

        encoding: {
          x: {
            field: "",
            type: "ordinal",
          },
          y: {
            aggregate: "count",
            field: "",
            type: "quantitative",
            //title: ''
          },
          color: {
            field: "",
            type: "ordinal",
            scale: {
              range: [
                "#3366cc",
                "#dc3912",
                "#ff9900",
                "#109618",
                "#990099",
                "#0099c6",
                "#dd4477",
                "#66aa00",
                "#b82e2e",
                "#316395",
                "#994499",
                "#22aa99",
                "#aaaa11",
                "#6633cc",
                "#e67300",
                "#8b0707",
                "#651067",
                "#329262",
                "#5574a6",
                "#3b3eac",
              ],
            },
          },
          xOffset: { field: "" },
        },
      },

      ///////////////////////////////    3  BarChartxOffNominal     /////////////////////////////////
      {
        vis_name: "BarChartxOffNominal",
        description: "A simple bar chart with embedded data.",
        width: 200,
        height: 200,
        mark: { type: "bar", width: 15, barSpacing: 1 },
        encoding: {
          x: {
            field: "",
            type: "nominal",
          },
          y: {
            aggregate: "count",
            field: "",
            type: "quantitative",
          },
          color: {
            field: "",
            type: "nominal",
          },
          xOffset: { field: "" },
        },
      },

      ///////////////////////////////    4  BarChartOrdinal     /////////////////////////////////
      // if first defined garph category is ordinal then only any one color pallete will be displayed (i.e. blue)
      {
        vis_name: "BarChartOrdinal",
        description: "A simple bar chart with embedded data.",
        width: 200,
        height: 200,
        mark: "bar",
        encoding: {
          x: {
            bin: { maxbins: 10 },
            field: "",
            type: "quantitative",
          },
          y: {
            aggregate: "count",
            field: "",
            type: "quantitative",
          },
          color: {
            field: "",
            type: "ordinal",
            scale: {
              range: [
                "#3366cc",
                "#dc3912",
                "#ff9900",
                "#109618",
                "#990099",
                "#0099c6",
                "#dd4477",
                "#66aa00",
                "#b82e2e",
                "#316395",
                "#994499",
                "#22aa99",
                "#aaaa11",
                "#6633cc",
                "#e67300",
                "#8b0707",
                "#651067",
                "#329262",
                "#5574a6",
                "#3b3eac",
              ],
            },
          },
        },
      },

      ///////////////////////////////    5  BarChartNominal     /////////////////////////////////
      {
        vis_name: "BarChartNominal",
        description: "A simple bar chart with embedded data.",
        width: 200,
        height: 200,
        mark: "bar",
        encoding: {
          x: {
            bin: { maxbins: 10 },
            field: "",
            type: "quantitative",
          },
          y: {
            aggregate: "count",
            field: "",
            type: "quantitative",
          },
          color: {
            field: "",
            type: "nominal",
          },
        },
      },

      ///////////////////////////////    6  PieChartOrdinal     /////////////////////////////////
      {
        vis_name: "PieChartOrdinal",
        description: "A simple bar chart with embedded data.",
        width: 200,
        height: 200,
        mark: "arc",
        encoding: {
          theta: {
            aggregate: "count",
            type: "quantitative",
          },
          color: {
            field: "",
            type: "Ordinal",
            scale: {
              range: [
                "#3366cc",
                "#dc3912",
                "#ff9900",
                "#109618",
                "#990099",
                "#0099c6",
                "#dd4477",
                "#66aa00",
                "#b82e2e",
                "#316395",
                "#994499",
                "#22aa99",
                "#aaaa11",
                "#6633cc",
                "#e67300",
                "#8b0707",
                "#651067",
                "#329262",
                "#5574a6",
                "#3b3eac",
              ],
            },
          },
        },
      },

      ///////////////////////////////    7  PieCharNominal     /////////////////////////////////
      {
        vis_name: "PieCharNominal",
        description: "A simple bar chart with embedded data.",
        width: 200,
        height: 200,
        mark: "arc",
        encoding: {
          theta: {
            aggregate: "count",
            type: "quantitative",
          },
          color: {
            field: "",
            type: "Nominal",
          },
        },
      },

      ///////////////////////////////    8  LineChart     /////////////////////////////////
      {
        vis_name: "LineChart",
        width: 200,
        height: 200,
        mark: "line",
        encoding: {
          x: {
            field: "",
            type: "temporal",
          },
          y: {
            field: "",
            type: "quantitative",
          },
        },
      },

      ///////////////////////////////    9  LineChartOrdinal     /////////////////////////////////
      {
        vis_name: "LineChartOrdinal",
        width: 200,
        height: 200,
        mark: "line",
        encoding: {
          x: {
            field: "",
            type: "temporal",
          },
          y: {
            field: "",
            type: "quantitative",
          },
          color: {
            field: "",
            type: "Ordinal",
            scale: {
              range: [
                "#3366cc",
                "#dc3912",
                "#ff9900",
                "#109618",
                "#990099",
                "#0099c6",
                "#dd4477",
                "#66aa00",
                "#b82e2e",
                "#316395",
                "#994499",
                "#22aa99",
                "#aaaa11",
                "#6633cc",
                "#e67300",
                "#8b0707",
                "#651067",
                "#329262",
                "#5574a6",
                "#3b3eac",
              ],
            },
          },
        },
      },

      ///////////////////////////////    10  LineChartNominal     /////////////////////////////////
      {
        vis_name: "LineChartNominal",
        width: 200,
        height: 200,
        mark: "line",
        encoding: {
          x: {
            field: "",
            type: "temporal",
          },
          y: {
            field: "",
            type: "quantitative",
          },
          color: {
            field: "",
            type: "Nominal",
          },
        },
      },

      ///////////////////////////////    11    LineChartTemporal    /////////////////////////////////
      {
        vis_name: "LineChartTemporal",
        width: 200,
        height: 200,
        mark: "line",
        encoding: {
          x: {
            field: "",
            type: "temporal",
          },
          y: {
            field: "",
            type: "quantitative",
          },
        },
      },

      ///////////////////////////////    12  Scatterplot     /////////////////////////////////
      {
        vis_name: "Scatterplot",
        width: 200,
        height: 200,
        mark: "point",
        encoding: {
          x: {
            field: "",
            type: "quantitative",
          },
          y: {
            field: "",
            type: "quantitative",
          },
        },
      },

      ///////////////////////////////    13  ScatterplotOrdinal     /////////////////////////////////
      {
        vis_name: "ScatterplotOrdinal",
        width: 200,
        height: 200,
        mark: "point",
        encoding: {
          x: {
            field: "",
            type: "quantitative",
          },
          y: {
            field: "",
            type: "quantitative",
          },
          color: {
            field: "",
            type: "Ordinal",
            scale: {
              range: [
                "#3366cc",
                "#dc3912",
                "#ff9900",
                "#109618",
                "#990099",
                "#0099c6",
                "#dd4477",
                "#66aa00",
                "#b82e2e",
                "#316395",
                "#994499",
                "#22aa99",
                "#aaaa11",
                "#6633cc",
                "#e67300",
                "#8b0707",
                "#651067",
                "#329262",
                "#5574a6",
                "#3b3eac",
              ],
            },
          },
        },
      },

      ///////////////////////////////    14  ScatterplotNominal     /////////////////////////////////
      {
        vis_name: "ScatterplotNominal",
        width: 200,
        height: 200,
        mark: "point",
        encoding: {
          x: {
            field: "",
            type: "quantitative",
          },
          y: {
            field: "",
            type: "quantitative",
          },
          color: {
            field: "",
            type: "Nominal",
            scale: {
              range: [
                "#3366cc",
                "#dc3912",
                "#ff9900",
                "#109618",
                "#990099",
                "#0099c6",
                "#dd4477",
                "#66aa00",
                "#b82e2e",
                "#316395",
                "#994499",
                "#22aa99",
                "#aaaa11",
                "#6633cc",
                "#e67300",
                "#8b0707",
                "#651067",
                "#329262",
                "#5574a6",
                "#3b3eac",
              ],
            },
          },
        },
      },

      ///////////////////////////////    End of VL visualization Specification    /////////////////////////////////
    ];
    const response = await fetch(`./final_DBo_for_VL_${db}.csv`);
    const csvData = await response.text();
    const rows = csvData.split("\n").map((row) => row.split(","));

    const vlSpec_2: any[] = [];
    for (let i = 1; i < rows.length; i++) {
      for (let j = 0; j < visualizations.length; j++) {
        if (visualizations[j].vis_name === rows[i][1]) {
          let tempGraph: any = { ...visualizations[j] };
          const vl_encode = Object.keys(tempGraph.encoding);
          for (let k = 2; k < rows[i].length; k++) {
            for (let l = 0; l < vl_encode.length; l++) {
              if (vl_encode[l] === rows[i][k]) {
                tempGraph.encoding[vl_encode[l]] = {
                  ...tempGraph.encoding[vl_encode[l]],
                  field: rows[0][k],
                };
              }
            }
          }
          if ("xOffset" in tempGraph.encoding)
            tempGraph.encoding.xOffset.field = tempGraph.encoding.color.field;

          if (
            [
              "BarChartOrdinal",
              "BarChartNominal",
              "BarChartxOffOrdinal",
              "BarChartxOffNominal",
            ].includes(tempGraph.vis_name)
          ) {
            tempGraph.encoding.y.field = tempGraph.encoding.x.field;
          }
          vlSpec_2.push({ ...tempGraph });
        }
      }
    }

    vlSpec_2.forEach(async (element) => {
      const vlSpec: any = {
        data: { url: "input_file/student.csv", format: { type: "csv" } },
        columns: 3,
        vconcat: [element], // Wrap element in an array for vconcat
        resolve: { scale: { color: "independent" } },
      };
      const vegaspec = compile(vlSpec).spec;
      let contentArray: any = [];
      if (
        vegaspec != undefined &&
        vegaspec.data != undefined &&
        vegaspec.data[0].transform != undefined
      ) {
        if (vegaspec.data[0].transform[0].type == "extent") {
          contentArray = [vegaspec.data[0].transform[0].field];
        } else contentArray = vegaspec.data[0].transform[0].groupby;
      }
      const view = new View(parse(vegaspec), { renderer: "none" });
      const svg = await view.toSVG();
      const obj = {
        content: contentArray,
        svg: svg,
      };
      setVisualization((prevvisualization: any) => [...prevvisualization, obj]);
    });
  };

  React.useEffect(() => {
    setVisualization([]);
    getvisualization(db);
  }, [db]);
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        zoomedIndex !== null &&
        zoomedSvgRef.current &&
        !zoomedSvgRef.current.contains(event.target)
      ) {
        setZoomedIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [zoomedIndex]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 max-w-screen-xl">
      {visualization.length > 0 ? (
        visualization.map((svg: any, index: number) => (
          <div
            key={index}
            className={`flex flex-col justify-start items-center ${
              zoomedIndex === index ? "zoomed-svg" : ""
            }`}
          >
            <EachDBOComponent
              {...{
                svg: svg.svg,
                index,
                zoomedIndex,
                setZoomedIndex,
                setVisualization,
                zoomedSvgRef,
                content: svg.content,
                setClicked,
              }}
            />
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-center mb-4">
            Visualization 1
          </h1>
          <p className="text-xl text-center mb-4">Loading...</p>
        </div>
      )}
    </div>
  );
};

interface EachDBOComponentProps {
  svg: string;
  index: number;
  zoomedIndex: number | null;
  setZoomedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setVisualization: React.Dispatch<React.SetStateAction<any[]>>;
  zoomedSvgRef: React.MutableRefObject<any>;
  content: Array<string>;
  setClicked: React.Dispatch<React.SetStateAction<Array<any>>>;
}

const EachDBOComponent = ({
  svg,
  index,
  zoomedIndex,
  setZoomedIndex,
  setVisualization,
  zoomedSvgRef,
  content,
  setClicked,
}: EachDBOComponentProps) => {
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <>
      <div className="parent">
        <div
          dangerouslySetInnerHTML={{ __html: svg }}
          className={`div1 w-max h-max relative ${
            zoomedIndex === index ? "zoomed" : ""
          }`}
          ref={zoomedIndex === index ? zoomedSvgRef : null}
          onClick={() => {
            setClicked(content);
          }}
        />
        <MdDelete
          className="div2 fill-black h-6 w-6 flex justify-center items-center aspect-square"
          onClick={(e) => {
            e.preventDefault();
            setVisualization((prevvisualization: any) =>
              prevvisualization.filter((item: any, i: number) => i !== index)
            );
          }}
        />
        {isSaved ? (
          <BsBookmarkFill
            className="div3 fill-black h-6 w-6 flex justify-center items-center aspect-square"
            onClick={() => setIsSaved(false)}
          />
        ) : (
          <BsBookmark
            className="div3 fill-black h-6 w-6 flex justify-center items-center aspect-square"
            onClick={() => setIsSaved(true)}
          />
        )}
        <BiZoomIn
          className="div4 fill-black h-6 w-6 flex justify-center items-center aspect-square"
          onClick={() => {
            if (zoomedIndex === index) {
              setZoomedIndex(null);
            } else {
              setZoomedIndex(index);
              // Scroll the zoomed SVG element into view
              if (zoomedSvgRef.current) {
                zoomedSvgRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }
          }}
        />
        <div className="div5">
          <MdOutlineChangeCircle className="fill-black h-6 w-6 flex justify-center items-center aspect-square" />
          <AiOutlineDown className="fill-black h-6 w-6 flex justify-center items-center aspect-square" />
        </div>
        <div className="div6">
          <BiData className="fill-black h-6 w-6 flex justify-center items-center aspect-square" />
          <AiOutlineDown className="fill-black h-6 w-6 flex justify-center items-center aspect-square" />
        </div>
      </div>
    </>
  );
};

export default Screen;
