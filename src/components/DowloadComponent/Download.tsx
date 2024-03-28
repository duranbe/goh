import { Component } from "react";
import { Token } from "../Token/Token";

export class DownloadComponent extends Component<{ content: Token[] }> {
  render() {
    const csvFileHeaders = "id,tokenStartIndex,tokenEndIndex,value\n";

    const download = () => {
      let csvFileContent = this.props.content
        .map((token) => {
          return token.toCSVFormat();
        })
        .join("");
      const csvContent = `data:text/csv;charset=utf-8,${csvFileHeaders}${csvFileContent}`;
      const encodedURI = encodeURI(csvContent);
      window.open(encodedURI);
    };

    return (
      <div className="flex justify-end px-4">
        <button
          className="text-white bg-blue-500 px-4 py-2 rounded-md"
          onClick={download}
        >
          Download
        </button>
      </div>
    );
  }
}
