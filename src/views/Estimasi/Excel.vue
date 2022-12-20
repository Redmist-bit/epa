<template>
  <v-dialog
    v-model="dialogExcel"
    transition="dialog-bottom-transition"
    max-width="1200px"
    scrollable
    persistent
  >
    <v-card>
      <h1>Excel</h1>
      <v-toolbar flat dark color="red darken-4">
        <v-btn icon dark @click="dialogExcel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Import Excel</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="FormatExcel"> Format Excel </v-btn>
          <v-btn dark text @click="TambahData"> Simpan </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="dashboard-container">
        <v-card class="d-flex flex-wrap">
          <input
            type="file"
            style="display: none"
            @change="importExcel"
            id="upload"
          />
          <input
            id="a"
            type="button"
            value="Masukan Excel"
            onclick="document.getElementById('upload').click();"
          />

          <!-- <form method="get" action="file.xlsx">
        <button width="10px" class="custom-file-input" type="submit">Format Excel</button>
      </form> -->
        </v-card>
        <v-card>
          <!-- <div class="button_group"> -->

          <!-- </div> -->
          <div id="app">
            <ejs-grid
              :dataSource="dataArr"
              height="200%"
              width="100%"
              :allowReordering="true"
              :allowResizing="true"
              :allowPaging="true"
            >
              <e-columns>
                <e-column
                  field="Nama"
                  headerText="Nama Produk"
                  textAlign="Left"
                  width="200"
                ></e-column>

                <e-column
                  field="Kategori"
                  headerText="Kategori"
                  width="180"
                ></e-column>

                <e-column
                  field="SubKategori"
                  headerText="SubKategori"
                  width="180"
                ></e-column>

                <e-column field="Grup" headerText="Grup" width="150"></e-column>

                <e-column
                  field="SubGrup"
                  headerText="SubGrup"
                  width="150"
                ></e-column>

                <e-column field="Merk" headerText="Merk" width="150"></e-column>

                <e-column field="Type" headerText="Type" width="150"></e-column>

                <e-column
                  field="Aktif"
                  headerText="Aktif"
                  width="150"
                ></e-column>

                <e-column field="Memo" headerText="Memo" width="150"></e-column>

                <e-column
                  field="PartNumber1"
                  headerText="PartNumber1"
                  width="150"
                ></e-column>

                <e-column
                  field="PartNumber2"
                  headerText="PartNumber2"
                  width="150"
                ></e-column>

                <e-column
                  field="Kendaraan"
                  headerText="Kendaraan"
                  width="150"
                ></e-column>

                <e-column
                  field="Dimensi"
                  headerText="Dimensi"
                  width="150"
                ></e-column>
              </e-columns>
            </ejs-grid>
          </div>
        </v-card>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import xlsx from "xlsx";
import api from "@/services/http";
export default {
  name: "Dashboard",
  data() {
    return {
      data: [],
      publicPath: process.env.BASE_URL,
      todayDate: new Date().toISOString().slice(0, 10),
      dataArr: [],
      excel: [],
      Kode: "",
      tableColumn: [],
      dialogExcel: false,
      tableLoading: false,
      headers: [
        {
          text: "prop0",
          align: "left",
          value: "prop0",
        },
        { text: "Pelanggan", value: "prop1", align: "left", width: "150" },
        { text: "Data", value: "prop2", align: "left", width: "150" },
      ],
    };
  },
  mounted() {},
  watch: {
    dataArr() {
      if (this.dataArr.length > 0) {
        // let c = []
        for (let index = 0; index < this.dataArr.length; index++) {
          // const element = this.dataArr[index];
          if (!this.dataArr[index].Dimensi) this.dataArr[index].Dimensi = "-";
          if (!this.dataArr[index].Kategori) this.dataArr[index].Kategori = "-";
          if (!this.dataArr[index].Kendaraan)
            this.dataArr[index].Kendaraan = "-";
          if (!this.dataArr[index].Memo) this.dataArr[index].Memo = "-";
          if (!this.dataArr[index].Merk) this.dataArr[index].Merk = "-";
          if (!this.dataArr[index].Nama) this.dataArr[index].Nama = "-";
          if (!this.dataArr[index].PartNumber1)
            this.dataArr[index].PartNumber1 = "-";
          if (!this.dataArr[index].PartNumber2)
            this.dataArr[index].PartNumber2 = "-";
          if (!this.dataArr[index].SubKategori)
            this.dataArr[index].SubKategori = "-";
          if (!this.dataArr[index].Type) this.dataArr[index].Type = "-";
          if (!this.dataArr[index].Grup) this.dataArr[index].Grup = "-";
          if (!this.dataArr[index].SubGrup) this.dataArr[index].SubGrup = "-";
          if (!this.dataArr[index].Gudang) this.dataArr[index].Gudang = "-";
          if (!this.dataArr[index].Aktif) this.dataArr[index].Aktif = "0";
          if (!this.dataArr[index].DiBuatOleh)
            this.dataArr[index].DiBuatOleh = "-";
          // element.DiBuatTgl = this.todayDate
          if (!this.dataArr[index].DiubahOleh)
            this.dataArr[index].DiubahOleh = "-";
          // element.DiubahTgl = this.todayDate
          // c.push(element)
        }
        // Array.prototype.replaceEmptyElements = function(value) {
        //   for (var i = 0; i < this.length; i++) {
        //     if (typeof this[i] == "undefined") {
        //       this[i] = value;
        //     }
        //   }
        //   return this;
        // };
        // var val = '-'
        // let as = c.replaceEmptyElements(val);
        // console.log('aaaa',c)
        this.excel = [...new Array()];
        this.excel.push({ Excel: this.dataArr });
        let a = this.excel[0];
        console.log(a);
      } else {
        // do nothing
      }
    },
  },
  methods: {
    Open() {
      this.dialogExcel = true;
      this.dataArr = [];
    },
    Tutup() {
      this.dialogExcel = false;
      this.dataArr = [];
    },
    getHeader(sheet) {
      const XLSX = xlsx;
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      /* Get cell value start in the first row */
      const R = range.s.r; //Line / / column C
      let i = 0;
      for (C = range.s.c; C <= range.e.c; ++C) {
        var cell =
          sheet[
            XLSX.utils.encode_cell({ c: C, r: R })
          ]; /* Get the cell value based on the address  find the cell in the first row */
        var hdr = "UNKNOWN" + C; // replace with your desired default
        // XLSX.utils.format_cell Generate cell text value
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        if (hdr.indexOf("UNKNOWN") > -1) {
          if (!i) {
            hdr = "__EMPTY";
          } else {
            hdr = "__EMPTY_" + i;
          }
          i++;
        }
        headers.push(hdr);
      }
      return headers;
    },
    /**
     * Import table
     */
    importExcel(e) {
      const files = e.target.files;
      console.log("disni", files);
      if (!files.length) {
        return;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return alert("Hanya Menerima Excel File Ber Format XLS Atau XLSX");
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const XLSX = xlsx;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0]; // Take the first sheet，wb.SheetNames[0] :Take the name of the first sheet in the sheets
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // Generate JSON table content，wb.Sheets[Sheet名]    Get the data of the first sheet
          const excellist = []; // Clear received data
          // Edit data
          for (var i = 0; i < ws.length; i++) {
            excellist.push(ws[i]);
          }
          //   console.log("Read results", excellist); // At this point, you get an array containing objects that need to be processed
          // Get header2-1
          const a = workbook.Sheets[workbook.SheetNames[0]];
          const headers = this.getHeader(a);
          //   console.log('headers', headers);
          this.setTable(headers, excellist);
          // Get header2-2
        } catch (e) {
          return alert("Gagal Menbaca File!");
        }
      };
      fileReader.readAsBinaryString(files[0]);
      var input = document.getElementById("upload");
      input.value = "";
    },
    setTable(headers, excellist) {
      const tableTitleData = []; // Store table header data
      const tableMapTitle = {}; // Set table content for Chinese and English
      headers.forEach((_, i) => {
        tableMapTitle[_] = _;
        tableTitleData.push({
          text: _,
          value: "prop" + i,
        });
      });
      console.log("tableTitleData", tableTitleData);
      // Mapping table content attribute name is English
      const newTableData = [];
      excellist.forEach((_) => {
        const newObj = {};
        Object.keys(_).forEach((key) => {
          newObj[tableMapTitle[key]] = _[key];
        });
        newTableData.push(newObj);
      });
      console.log("newTableData/datanya", newTableData);
      this.tableColumn = tableTitleData;
      this.dataArr = newTableData;
    },

    FormatExcel() {
      let a = window.location.origin;
      let b = a.substr(7, 9);
      window.open("http://" + b + ":8000/product/Excel/FormatWebPart.xlsx");
    },
    TambahData() {
      api
        .post(
          "/ExcelPost?token=" + localStorage.getItem("token"),
          this.excel[0]
        )
        .then((res) => {
          this.Tutup();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-file-input {
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "Import Excel";
  color: black;
  display: inline-block;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}

#a {
  color: black;
  display: inline-block;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
// Button style
</style>
