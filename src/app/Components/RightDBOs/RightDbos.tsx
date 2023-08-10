"use client";

import React from "react";
import { compile } from "vega-lite";
import { parse, View } from "vega";
import { MdDelete } from "react-icons/md";
import "./Right.css";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
const Right = ({ setDB }: { setDB: React.SetStateAction<any> }) => {
  const [svgs, setSvgs] = React.useState<any>([]);

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
  const getSVGs = async (fileNumber: number) => {
    const response = await fetch(`./final_DBo_for_VL_${fileNumber}.csv`);
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

    const vlSpec: any = {
      data: { url: "input_file/student.csv", format: { type: "csv" } },
      columns: 3,
      vconcat: vlSpec_2, // Wrap element in an array for vconcat
      resolve: { scale: { color: "independent" } },
    };
    const vegaspec = compile(vlSpec).spec;
    const view = new View(parse(vegaspec), { renderer: "none" });
    await view.toSVG().then((svg) =>
      setSvgs((prevSVGs: any) => {
        return [...prevSVGs, svg];
      })
    );
  };

  React.useEffect(() => {
    getSVGs(2).then(() => {
      getSVGs(3).then(() => {
        getSVGs(4).then(() => {
          getSVGs(5);
        });
      });
    });

    // getSVGs(3);
    // getSVGs(4);
    // getSVGs(5);
  }, []);

  return (
    <main className="flex flex-col justify-start items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-center text-[#5A44D5]">
          Other DBOs
        </h1>
      </div>
      {svgs.map((svg: any, index: number) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-3"
          >
            <EachDBOComponent
              setDB={setDB}
              svg={svg}
              setSvgs={setSvgs}
              index={index}
            />
          </div>
        );
      })}
    </main>
  );
};

const EachDBOComponent = ({ setDB, svg, setSvgs, index }: any) => {
  const [isSaved, setIsSaved] = React.useState(false);
  return (
    <>
      <div
        className="bg-white shadow-lg rounded-lg"
        onClick={() => {
          setDB(index + 2);
        }}
      >
        <div className="px-2 py-2 ">
          <div
            className="h-max w-max svg-container"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      </div>
      <div className="flex w-full justify-around items-center">
        {isSaved ? (
          <BsBookmarkFill
            className="div3 fill-black h-6 w-6 flex justify-center items-center aspect-square"
            onClick={() => setIsSaved(false)}
          />
        ) : (
          <BsBookmark className="div3 fill-black h-6 w-6 flex justify-center items-center aspect-square" 
          onClick={() => setIsSaved(true)}
          />
        )}
        <MdDelete
          className="div2 fill-black h-6 w-6 flex justify-center items-center aspect-square"
          onClick={(e) => {
            e.preventDefault();
            setSvgs((prevSvgs: any) =>
              prevSvgs.filter((item: any, i: number) => i !== index)
            );
          }}
        />
      </div>
    </>
  );
};

export default Right;
