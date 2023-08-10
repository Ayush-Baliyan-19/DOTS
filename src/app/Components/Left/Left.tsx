"use client";

import React, { useEffect, useState } from "react";

import { BsFillTriangleFill, BsUpload } from "react-icons/bs";

import "./LeftComponent.css";

const LeftComponent = ({ clicked }: { clicked: Array<string> }) => {
  const [csvData, setCSVData] = useState<any>([]);

  // Handle file input change
  const fetchMetadata = async () => {
    try {
      const response = await fetch("./metadata.csv");
      const csvText = await response.text();
      const parsedData: ParsedLine[] = parseCSVData(csvText);
      setCSVData(parsedData);
    } catch (error) {
      console.error("Error fetching metadata.csv:", error);
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  useEffect(() => {
    clicked.forEach((data: string) => {
      const elem = document.getElementById(data);
      if (elem) {
        elem.click();
      }
    });
  }, [clicked]);

  // Parse the CSV data

  interface ParsedLine {
    DA_name: string;
    DA_type: string;
    unique_value: string;
    user_imp: string;
  }

  const parseCSVData = (csvText: any): ParsedLine[] => {
    const lines = csvText.split("\n");

    // Remove empty lines
    const nonEmptyLines = lines.filter((line: string) => line.trim() !== "");

    // Extract the headers
    const parsedData: ParsedLine[] = [];

    for (let i = 0; i < nonEmptyLines.length; i++) {
      const line = nonEmptyLines[i];
      const lineData = line.split(",");
      for (let j = 0; j < lineData.length; j++) {
        if (lineData[0] === "DA_name") {
          let newObject = {
            DA_name: lineData[j],
            DA_type: "",
            unique_value: "",
            user_imp: "",
          };
          // dataArray.push(newObject);
          parsedData.push(newObject);
        } else if (lineData[0] === "DA_type") {
          parsedData[j].DA_type = lineData[j];
        } else if (lineData[0] === "unique_value") {
          parsedData[j].unique_value = lineData[j];
        } else if (lineData[0] === "user_imp") {
          parsedData[j].user_imp = lineData[j];
        }
      }
    }

    return parsedData.slice(1, parsedData.length - 1);
  };
  // Handle option change
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-max main-left flex flex-col items-start gap-1 px-2 h-[80vh] overflow-y-auto">
        <br />
        {csvData.length > 0 && (
          <>
            {csvData.map((data: any, index: number) => {
              return (
                <EachDA
                  item={data}
                  key={index}
                  setCSVData={setCSVData}
                  index={index}
                />
              );
            })}
          </>
        )}
        <br />
      </div>
    </div>
  );
};

const EachDA = ({ item, setCSVData, index }: any) => {
  const [SelectedDA_type, setSelectedDA_type] = useState<string>(item.DA_type);
  const DA_type_array = [
    "Numeric",
    "Nominal",
    "Ordinal",
    "Imageurl",
    "Url",
    "Time",
    "Country",
    "Source",
    "Target",
    "NodeNumeric",
    "EdgeNumeric",
    "NodeNominal",
    "EdgeNominal",
    "NodeOrdinal",
    "EdgeOrdinal",
    "unknown",
  ];
  const [selecteduser_imp, setSelecteduser_imp] = useState<any>(item.user_imp);
  const [isCustomUser_imp, setIsCustomUser_imp] = useState<boolean>(false);
  const user_imp_array = [
    {
      text: "Very important (100)",
      value: "100",
    },
    {
      text: "Important (75)",
      value: "75",
    },
    {
      text: "Average (50)",
      value: "50",
    },
    {
      text: "Less Important (25)",
      value: "25",
    },
    {
      text: "Exclude (0)",
      value: "0",
    },
  ];
  useEffect(() => {
    if (user_imp_array.some((data: any) => data.value === selecteduser_imp)) {
      setIsCustomUser_imp(false);
    } else {
      setIsCustomUser_imp(true);
    }
  }, [selecteduser_imp]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClickAnimation = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      className={`flex flex-col items-start gap-1 w-min  ${
        isOpen ? "open" : "closed"
      }`}
    >
      <div className=" flex justify-around gap-2 items-center">
        <div
          className="arrow-clickable"
          onClick={handleClickAnimation}
          id={item.DA_name}
        >
          <BsFillTriangleFill
            color="white"
            className={`transition-all ${
              isOpen ? "rotate-180" : "rotate-90"
            } self-center`}
          />
        </div>
        <div className="DA_Name w-[15vw] overflow-hidden">{item.DA_name}</div>
        <div className="unique_val">{item.unique_value}</div>
      </div>
      <div className="content flex flex-col justify-center items-start gap-2">
        <select
          name=""
          id=""
          className="text-black w-[15vw] rounded-md px-3 py-1 font-medium outline-none border-none"
          onChange={(e) => {
            setCSVData((prev: any) => {
              let newArray = [...prev];
              newArray[index].DA_type = e.target.value;
              return newArray;
            });
          }}
        >
          {DA_type_array.map((data: any, index: number) => {
            return (
              <option
                value={data}
                key={index}
                selected={data === SelectedDA_type}
              >
                {data}
              </option>
            );
          })}
        </select>
        <div className="user_imp flex gap-5 w-max">
          {user_imp_array.some(
            (data: any) => data.value === selecteduser_imp
          ) ? (
            <div className="flex justify-center items-start flex-col gap-2 outline-none border-none">
              <select
                name=""
                id=""
                className="text-black w-[15vw] rounded-md px-3 py-1 font-medium outline-none border-none"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setIsCustomUser_imp(true);
                  } else {
                    setIsCustomUser_imp(false);
                    setCSVData((prev: any) => {
                      let newArray = [...prev];
                      newArray[index].user_imp = e.target.value;
                      return newArray;
                    });
                  }
                }}
              >
                {user_imp_array.map((data: any, index: number) => {
                  return (
                    <option
                      value={data.value}
                      key={index}
                      selected={data.value === selecteduser_imp}
                    >
                      {data.text}
                    </option>
                  );
                })}
                <option value="">Manual Value (0 to 100)</option>
              </select>
              {isCustomUser_imp && (
                <input
                  type="string"
                  name=""
                  id=""
                  placeholder="Manual Value (0 to 100)"
                  max={99}
                  className="text-black w-[15vw] rounded-md px-3 py-1 font-medium outline-none border-none"
                  onChange={(e) => {
                    setCSVData((prev: any) => {
                      let newArray = [...prev];
                      if (Number(e.target.value) > 100) {
                        newArray[index].user_imp = selecteduser_imp;
                      } else if (e.target.value === "") {
                        newArray[index].user_imp = "50";
                      } else {
                        newArray[index].user_imp = e.target.value;
                      }
                      return newArray;
                    });
                  }}
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-start gap-2">
              <select
                name=""
                id=""
                className="text-black w-[15vw] rounded-md px-3 py-1 font-medium outline-none border-none"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setIsCustomUser_imp(true);
                  } else {
                    setIsCustomUser_imp(false);
                    setCSVData((prev: any) => {
                      let newArray = [...prev];
                      newArray[index].user_imp = e.target.value;
                      return newArray;
                    });
                  }
                }}
              >
                {user_imp_array.map((data: any, index: number) => {
                  return (
                    <option value={data.value} key={index}>
                      {data.text}
                    </option>
                  );
                })}
                <option value="" selected>
                  Manual Value (0 to 100)
                </option>
              </select>
              {isCustomUser_imp && (
                <input
                  type="string"
                  name=""
                  id=""
                  value={selecteduser_imp}
                  placeholder="Enter value"
                  max={99}
                  className="text-black w-[15vw] rounded-md px-3 py-1 font-medium outline-none border-none"
                  onChange={(e) => {
                    setCSVData((prev: any) => {
                      let newArray = [...prev];
                      if (Number(e.target.value) > 100) {
                        newArray[index].user_imp = selecteduser_imp;
                      } else if (e.target.value === "") {
                        newArray[index].user_imp = "50";
                      } else {
                        newArray[index].user_imp = e.target.value;
                      }
                      return newArray;
                    });
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftComponent;
